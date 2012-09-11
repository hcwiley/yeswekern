# Django settings for yeswekern project.

import sys
import socket
import os

host = socket.gethostname()
IS_DEV = False

if 'settings.py' in os.listdir('.'):
    IS_DEV = True
DEBUG = True#IS_DEV
TEMPLATE_DEBUG = DEBUG

ADMINS = (
    ('Cole Wiley', 'hwiley2@lsu.edu'),
)

MANAGERS = ADMINS
MEDIA_ROOT = '/django/yeswekern'
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', # Add 'postgresql_psycopg2', 'postgresql', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': 'yeswekern',                      # Or path to database file if using sqlite3.
        'USER': 'gdso',                      # Not used with sqlite3.
        'PASSWORD': 'design',                  # Not used with sqlite3.
        'HOST': '',                      # Set to empty string for localhost. Not used with sqlite3.
        'PORT': '',                      # Set to empty string for default. Not used with sqlite3.
    }
}
TEMPLATE_DIRS = (
   MEDIA_ROOT + '/yeswekern/templates/'
)
sys.path.append('/django/')
sys.path.append('/django/yeswekern/')
sys.path.append("/django/yeswekern/yeswekern/")
sys.path.append("/django/yeswekern/yeswekern/apps/")
sys.path.append("/django/yeswekern/yeswekern/apps/piece/")
sys.path.append("/django/yeswekern/yeswekern/apps/designer/")

# URL that handles the media served from MEDIA_ROOT. Make sure to use a
# trailing slash if there is a path component (optional in other cases).
# Examples: "http://media.lawrence.com", "http://example.com/media/"
MEDIA_URL = '/media/'

# URL prefix for admin media -- CSS, JavaScript and images. Make sure to use a
# trailing slash.
# Examples: "http://foo.com/media/", "/media/".
ADMIN_MEDIA_PREFIX = '/media/admin/'

STATIC_DOC_ROOT = MEDIA_ROOT +'/public'
GALLERY_ROOT = MEDIA_ROOT + '/gallery'
THUMB_ROOT = GALLERY_ROOT + '/thumbs'

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# On Unix systems, a value of None will cause Django to use the same
# timezone as the operating system.
# If running in a Windows environment this must be set to the same as your
# system time zone.
TIME_ZONE = 'America/Chicago'

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = 'en-us'

SITE_ID = 1

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True

# If you set this to False, Django will not format dates, numbers and
# calendars according to the current locale
USE_L10N = True

# Make this unique, and don't share it with anybody.
SECRET_KEY = 'jse$r$m+&3k$y8jtv8pllp268@**a=2%j*_$ovxr)$x8g@c-h9'

# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
#     'django.template.loaders.eggs.Loader',
)

MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
)

ROOT_URLCONF = 'yeswekern.urls'

INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    # Uncomment the next line to enable the admin:
    'django.contrib.admin',
    # Uncomment the next line to enable admin documentation:
    'django.contrib.admindocs',
    'piece',
    'designer',
)