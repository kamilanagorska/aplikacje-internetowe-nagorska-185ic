# Generated by Django 3.1.4 on 2021-01-11 10:21

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('food', models.CharField(default='', max_length=100)),
                ('description', models.CharField(default='', max_length=200)),
                ('score', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(10)])),
                ('published', models.BooleanField(default=False)),
            ],
        ),
    ]
