from dataclasses import field
from pyexpat import model
from tkinter import CASCADE
from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model


# Create your models here.
class Users(AbstractUser):
    id = models.AutoField(primary_key=True, db_column='user_id')
    username = models.CharField(max_length=20, unique=True)
    email = models.EmailField(
        verbose_name='email address', max_length=255, unique=True)
    password = models.CharField(max_length=300, null=False)

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


class Categories(models.Model):
    category_id = models.AutoField(primary_key=True, db_column='category_id')
    category = models.CharField(max_length=20, null=False)


class Notes(models.Model):
    note_id = models.AutoField(primary_key=True, db_column='note_id')
    user_id = models.ForeignKey(
        Users, on_delete=models.CASCADE, db_column='user_id')
    title = models.CharField(max_length=50, null=False)
    date = models.DateTimeField(default=now, null=True)
    category_id = models.ForeignKey(
        Categories, on_delete=models.CASCADE, db_column="category_id")
    contents = models.TextField(verbose_name="contents", null=False)

class NoteImages(models.Model):
    image = models.ImageField(null=True, upload_to="", blank=True)

class Summary(models.Model):
    summary_id = models.AutoField(primary_key=True, db_column='summary_id')
    note_id = models.ForeignKey(
        Notes, on_delete=models.CASCADE, db_column='note_id')
    summary = models.TextField(verbose_name="summary", null=False)


class Keywords(models.Model):
    keyword_id = models.AutoField(primary_key=True, db_column='keyword_id')
    keyword = models.CharField(max_length=20, null=False)
    note_id = models.ForeignKey(
        Notes, on_delete=models.CASCADE, db_column='note_id')
