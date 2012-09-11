from django.db import models
from django.template.defaultfilters import slugify
from django.contrib import admin
from django.forms import ModelForm
import datetime

POSITIONS = (('gd', 'Graphic Designer'), ('photo','Photographer'),('fa','Faculty Advisor'),('web','Web Developer'), ('other','Other'))
DEGREE = (('bfa', 'BFA'), ('mfa','MFA'),('phd','PHD'))

class Designer(models.Model):
    name = models.CharField(max_length=400)
    alumni = models.BooleanField()
    degree = models.CharField(max_length=3, choices=DEGREE, null=True, blank=True)
    graduation_year = models.IntegerField(null=True, blank=True)
    position = models.CharField(max_length=400, choices=POSITIONS)
    
    def __unicode__(self):
        return self.name

class DesignerForm(ModelForm):
    class Meta:
        model = Designer

admin.site.register(Designer)
#admin.site.register(DesignerForm)