from django.db import models


class ContactMessage(models.Model):
    name        = models.CharField(max_length=120)
    email       = models.EmailField()
    subject     = models.CharField(max_length=200, blank=True)
    message     = models.TextField()
    received_at = models.DateTimeField(auto_now_add=True)
    is_read     = models.BooleanField(default=False)

    class Meta:
        ordering            = ['-received_at']
        verbose_name        = 'Contact Message'
        verbose_name_plural = 'Contact Messages'

    def __str__(self):
        return f'[{self.received_at.strftime("%Y-%m-%d %H:%M")}] {self.name} — {self.subject or "No subject"}'