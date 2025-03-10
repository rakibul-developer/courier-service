from django.contrib import admin

class PackageAdmin(admin.ModelAdmin):
    list_display = ('name', 'sender', 'receiver', 'status')
    list_filter = ('is_deleted',)
    search_fields = ('name',)
    ordering = ['-created_at']