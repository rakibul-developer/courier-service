# Generated by Django 5.1.7 on 2025-03-10 00:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('packages', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='package',
            name='receiver',
            field=models.EmailField(max_length=255),
        ),
        migrations.AlterField(
            model_name='package',
            name='sender',
            field=models.EmailField(max_length=255),
        ),
    ]
