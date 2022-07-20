from django.forms import ModelForm
from .models import NotesImage

class FileUploadForm(ModelForm):
    class Meta:
        model = NotesImage
        fields = ['image']