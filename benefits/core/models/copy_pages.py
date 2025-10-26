from enum import Enum

from django.db import models
from benefits.core.models.transit import TransitAgency


class Language(Enum):
    ENGLISH = ("en", "English")
    SPANISH = ("es", "Spanish")

    @classmethod
    def choices(cls):
        return [(language.value[0], language.value[1]) for language in cls]

    @classmethod
    def label(cls, code: str) -> str:
        return dict(cls.choices()).get(code)


class CopyEligibility(models.Model):

    id = models.AutoField(primary_key=True)
    id_agency = models.ForeignKey(TransitAgency, on_delete=models.CASCADE)
    language = models.CharField(max_length=2, choices=Language.choices())
    headline = models.CharField(max_length=255)
    form_text = models.CharField(max_length=255)

    def __str__(self):
        agency_name = self.id_agency.short_name
        language_full = Language.label(self.language)

        return f"{agency_name} - {language_full}"
