from django.http import HttpResponseNotFound, HttpResponse, Http404
from django.shortcuts import render_to_response
from django.conf import settings
from django.core.context_processors import *
from django.template.defaultfilters import slugify
from django.core.files.uploadedfile import SimpleUploadedFile
from apps.forms import *
from piece.models import *
from designer.models import *
import os
from django.contrib.auth import *
from django.contrib import auth

def default(request, page):
    pieces = getPieces()
    if len(Piece.objects.filter(slug=page)) != 0 :
        args = {
               'pieces': pieces,
               'page' : 'piece.html',
               'piece' : Piece.objects.filter(slug=page)[0]
        }
        args.update(csrf(request))
        return render_to_response('default.html', args)
    elif('html' not in page):
        page = '%s.html' % page
    if(page in os.listdir(settings.TEMPLATE_DIRS[0])):
        print page
        if(len(pieces) != 0):
            args = {
               'pieces': pieces,
               'page' : page,
            }
        else:
            args = {
                    'page' : page,
            }
        if('contact' in page):
            args['advisor'] = getPosition('fa')
            args['graphic_designers'] = getPosition('gd')
            args['web_developer'] = getPosition('web')
            args['photographer'] = getPosition('photo')
            args['alumni'] = getPosition('alumni')
            args['designer_form'] = DesignerForm(auto_id='designer_%s')
        args.update(csrf(request))
        return render_to_response('default.html', args)
    else:
        raise Http404

def getPosition(pos):
    if pos != 'alumni':
        position = Designer.objects.all().filter(position=pos)
        if len(position) > 0:
#            position = position[0]
            position = position.all().filter(alumni=False)
            return position
        else:
            return None
    else:
        return Designer.objects.all().filter(alumni=True)

def getPieces():
    return Piece.objects.all()

def getPiece(slg):
    if len(Piece.objects.filter(slug=slg)) != 0 :
      return Piece.objects.filter(slug=slg)[0]

def get_page(request, page):
    print 'getting page: %s' % page
    if len(Piece.objects.filter(slug=page)) != 0:
        print 'its piece page'
        print pieces
        args = {
                'piece': getPiece(page),
                'pieces': getPieces(),
                }
        return render_to_response('piece.html', args)
    elif('html' not in page):
        page = '%s.html' % page
    if(page in os.listdir(settings.TEMPLATE_DIRS[0])):
        print 'its a normal page'
        pieces = getPieces()
        args = {
            'pieces': pieces,
            'piece_form': PieceForm(auto_id='piece_%s'),
        }
        if('contact' in page):
            args['advisor'] = getPosition('fa')
            args['graphic_designers'] = getPosition('gd')
            args['web_developer'] = getPosition('web')
            args['photographer'] = getPosition('photo')
            args['alumni'] = getPosition('alumni')
            args['designer_form'] = DesignerForm(auto_id='designer_%s')
        args.update(csrf(request))
        return render_to_response(page, args)
    else:
        print 'well fuck...'
        return HttpResponseNotFound("couldn't find it")

def get_header(request):
    args = {
            'pieces' : getPieces(),
            }
    return render_to_response('header.html', args)

def edit(request, page):
    pieces = getPieces()
    if len(Piece.objects.filter(slug=page)) != 0:
        args = {
               'pieces': pieces,
               'page' : 'edit_piece.html',
               'piece' : Piece.objects.filter(slug=page)[0],
               'piece_form': PieceForm(auto_id='piece_%s'),
               'user': request.user,
        }
        args.update(csrf(request))
        return render_to_response('edit.html', args)
    elif('html' not in page):
        page = '%s.html' % page
    if(page in os.listdir(settings.TEMPLATE_DIRS[0])):
        if request.user.is_authenticated():
            page = 'edit_%s' % page
        if(len(pieces) != 0):
            args = {
               'pieces': pieces,
               'page' : page,
               'piece_form': PieceForm(auto_id='piece_%s'),
               'user': request.user,
            }
        else:
            args = {
                'page' : page,
                'piece_form': PieceForm(auto_id='piece_%s'),
                'user': request.user,
            }
        if('contact' in page):
            args['advisor'] = getPosition('fa')
            args['graphic_designers'] = getPosition('gd')
            args['web_developer'] = getPosition('web')
            args['photographer'] = getPosition('photo')
            args['alumni'] = getPosition('alumni')
            args['designer_form'] = DesignerForm(auto_id='designer_%s')
        args.update(csrf(request))
        return render_to_response('edit.html', args)
    else:
        raise Http404

def edit_piece(request, slg):
    if request.user.is_authenticated():
        args = {
                'piece': getPiece(slg),
                'pieces': getPieces(),
                'piece_form': PieceForm(auto_id='piece_%s'),
                'user': request.user,
                }
        args.update(csrf(request))
        return render_to_response('edit_piece.html', args)
    else:
        args = {
           'pieces' : getPiece(),
           'piece_form': PieceForm(auto_id='piece_%s'),
           'user': request.user,
    }
    args.update(csrf(request))
    return render_to_response('edit_index.html', args)

def add_piece(request):
    if request.method != "POST":
        raise Http404
    form = PieceForm(request.POST, request.FILES)
    if form.is_valid():
        title = form.cleaned_data['title']
        img = request.FILES['default_image']
        img = MyImage.objects.get_or_create(image=img)[0]
        img.save()
        imgs = []
        for i in range(len(request.FILES) - 1):
            tmp = request.FILES['image%d' % (i + 1)]
            tmp = MyImage.objects.get_or_create(image=tmp)[0]
            tmp.save()
            imgs.append(tmp)
        if form.cleaned_data['date'] != '':
            date = form.cleaned_data['date']
        obj = Piece.objects.get_or_create(slug=slugify(title))[0]
        obj.title = title
        obj.default_image = img
        if len(imgs) > 0:
            obj.images = imgs
        if date:
            obj.date = date
        obj.save()

        return HttpResponse("success")
    else:
        print 'bad form'
        return HttpResponseNotFound("invalid form")
def add_designer(request):
    if request.method != "POST":
        raise Http404
    form = DesignerForm(request.POST)
    if form.is_valid():
        name = form.cleaned_data['name']
        degree = form.cleaned_data['degree']
        position = form.cleaned_data['position']
        year = form.cleaned_data['graduation_year']
        alumni = form.cleaned_data['alumni']
        
        obj = Designer.objects.get_or_create(name=name)[0]
        obj.degree = degree
        obj.position = position
        obj.graduation_year = year
        obj.alumni = alumni
        obj.save()
        
        return HttpResponse('success')
    else:
        return HttpResponseNotFound("bad form..")
        

def login(request):
    if request.method != "POST":
        raise Http404
    usern = request.POST['username']
    passw = request.POST['password']
    user = auth.authenticate(username=usern, password=passw)
    if user is not None and user.is_active:
        # Correct password, and the user is marked "active"
        auth.login(request, user)
        # Redirect to a success page.
        return HttpResponse("success")
    else:
        # Show an error page
        return HttpResponseNotFound("no good")
def logout(request):
    if request.method != "POST":
        raise Http404
    auth.logout(request)
    # Redirect to a success page.
    return HttpResponse("success")
