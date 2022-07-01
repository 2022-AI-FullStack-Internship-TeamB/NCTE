from pyexpat import model
from tkinter import CASCADE
from django.db import models
from django.utils.timezone import now


# Create your models here.
class Users(models.Model):
    user_id = models.AutoField(primary_key=True, db_column='user_id')
    nickname = models.CharField(max_length=20, null=False)
    email_address = models.CharField(max_length=40, null=False)
    password = models.CharField(max_length=20, null=False)


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
    contents = models.CharField(max_length=400, null=False)


class Summary(models.Model):
    summary_id = models.AutoField(primary_key=True, db_column='summary_id')
    note_id = models.ForeignKey(
        Notes, on_delete=models.CASCADE, db_column='note_id')
    summary = models.CharField(max_length=100, null=False)


class Keywords(models.Model):
    keyword_id = models.AutoField(primary_key=True, db_column='keyword_id')
    keyword = models.CharField(max_length=20, null=False)
    note_id = models.ForeignKey(
        Notes, on_delete=models.CASCADE, db_column='note_id')
