from django.conf.urls.defaults import *
from django.contrib import databrowse
from django.conf import settings
from django.contrib import admin
from django.views.generic.simple import direct_to_template
from piece.models import *

admin.autodiscover()

urlpatterns = patterns('',
    (r'^$', 'views.default', {'page':'index.html'}),
    (r'^/$', 'views.default', {'page':'index.html'}),
    (r'^robots.txt$', direct_to_template, {'template':'robots.txt', 'mimetype':'text/plain'})
)

urlpatterns += patterns('',
    (r'^admin/doc/', include('django.contrib.admindocs.urls')),
    (r'^admin/', include(admin.site.urls)),
)
# let django serve static media
if(settings.IS_DEV):
    urlpatterns += patterns('',
        (r'^media/gallery/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.GALLERY_ROOT}),
        (r'^media/gallery/thumbs/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.THUMB_ROOT}),
        (r'^media/*/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_DOC_ROOT}),
    )
#add content
urlpatterns += patterns('',
    (r'^add/piece$', 'views.add_piece'),
    (r'^add/designer$', 'views.add_designer'),
)

#Login
urlpatterns += patterns('',
    (r'^login$', 'views.login'),
    (r'^logout$', 'views.logout'),
)

#Edit pages
urlpatterns += patterns('',
    (r'^edit$','views.edit', {'page':'index.html'}),
    (r'^edit/$','views.edit', {'page':'index.html'}),
    (r'^edit/(?P<page>.*)$', 'views.edit'),
)

#Refresh individual elements
urlpatterns += patterns('',
    (r'^get/header$','views.get_header'),
    (r'^get/(?P<page>.*)$','views.get_page'),
)
#Series pages
urlpatterns += patterns('',
    (r'^(?P<page>.*)$', 'views.default'),
)