from django.contrib import admin

class TimestampMixin(admin.ModelAdmin):
    readonly_fields = ('created_at', 'updated_at')
