from django.forms import ModelForm
from .models import NoteImages

class FileUploadForm(ModelForm):
    class Meta:
        model = NoteImages
        fields = ['noteimage_id', 'image']