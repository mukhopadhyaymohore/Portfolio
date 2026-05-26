from django.contrib import admin
from .models import ContactMessage

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display  = ('name', 'email', 'subject', 'received_at', 'is_read')
    list_filter   = ('is_read', 'received_at')
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('name', 'email', 'subject', 'message', 'received_at')
    ordering      = ('-received_at',)

    def has_add_permission(self, request):
        return False  # contact messages only come from the form