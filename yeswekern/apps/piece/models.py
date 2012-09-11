from django.db import models
from django import forms
from django.forms import ModelForm
#from django.core.files import ContentFile 
from django.contrib import admin
from django.template.defaultfilters import slugify
from django.conf import settings
import Image
from designer.models import *
from os import mkdir, listdir

class MyImage(models.Model):
    image = models.ImageField(upload_to='gallery/')
    thumb = models.ImageField(upload_to='gallery/thumbs', blank=True, null=True, editable=False)
    thumbsize = (300,300)
    
    def save(self, *args, **kwargs):
        super(MyImage, self).save(*args, **kwargs)
        self.saveThumb()
    
    def saveThumb(self):
        path = '%s/%s' % (settings.MEDIA_ROOT, self.image)
        img = Image.open(path)
        img = img.resize(self.thumbsize, Image.ANTIALIAS)
        path = path.replace('gallery', 'gallery/thumbs')
        if 'thumbs' not in listdir(settings.GALLERY_ROOT):
            mkdir('%s' % settings.THUMB_ROOT)
        img.save(path)
        self.thumb = path
    
    class Meta:
        ordering = ['image']
        
    def __unicode__(self):
        return self.image.url
    
    def thumb(self):
        return self.image.url.replace('gallery','gallery/thumbs')

class Link(models.Model):
    url = models.URLField(unique=False)
    
    class Meta:
        ordering = ['url']

    def with_http(self):
        if self.url.startswith('http://'):
            return self.url
        else:
            return 'http://' + self.url

    def __unicode__(self):
        if self.url.startswith('http://'):
            return self.url[7:]
        else:
            return self.url

class PieceElement(models.Model):
    name = models.CharField(max_length=400)
    link = models.ForeignKey(Link, related_name='%(app_label)s_%(class)s_link', null=True, blank=True)
    
    def __unicode__(self):
        return self.name
class Piece(models.Model):
    title = models.CharField(max_length=400)
    default_image = models.ForeignKey(MyImage, related_name='%(app_label)s_%(class)s_default_image', null=True, blank=True)
    images = models.ManyToManyField(MyImage, related_name='%(app_label)s_%(class)s_images', null=True, blank=True) 
    date = models.DateField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    client = models.ForeignKey(PieceElement, related_name='%(app_label)s_%(class)s_client', null=True, blank=True)
    designers = models.ManyToManyField(Designer, related_name='%(app_label)s_%(class)s_designers', null=True, blank=True)
    awards = models.ManyToManyField(PieceElement, related_name='%(app_label)s_%(class)s_awards', null=True, blank=True)
    link = models.ForeignKey(Link, related_name='%(app_label)s_%(class)s_link', null=True, blank=True)
    slug=models.SlugField(max_length=160,blank=True,editable=False)
    
    def __unicode__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Piece, self).save(*args, **kwargs)
    
class PieceForm(forms.Form):
    title = forms.CharField(max_length=400)
    default_image = forms.ImageField(widget=forms.FileInput(), required=False)
    image1 = forms.ImageField(widget=forms.FileInput(), required=False)
    image2 = forms.ImageField(widget=forms.FileInput(), required=False)
    image3 = forms.ImageField(widget=forms.FileInput(), required=False)
    image4 = forms.ImageField(widget=forms.FileInput(), required=False) 
    date = forms.DateField(required=False)
    description = forms.CharField(widget=forms.Textarea, required=False)
    
    class Meta:
        model = Piece