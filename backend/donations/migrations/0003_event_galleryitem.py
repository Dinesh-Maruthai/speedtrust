# Generated manually for Event and GalleryItem CMS models

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('donations', '0002_donationallocation_donationcampaign_taxreceipt_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('category', models.CharField(choices=[('Nutrition', 'Nutrition'), ('Education', 'Education'), ('Healthcare', 'Healthcare'), ('Community', 'Community'), ('Sports', 'Sports'), ('Celebrations', 'Celebrations'), ('Arts', 'Arts')], default='Community', max_length=50)),
                ('description', models.TextField()),
                ('details', models.TextField(blank=True)),
                ('date', models.CharField(max_length=50)),
                ('location', models.CharField(max_length=255)),
                ('beneficiaries', models.CharField(blank=True, max_length=100)),
                ('volunteers', models.CharField(blank=True, max_length=100)),
                ('donor', models.CharField(blank=True, max_length=100)),
                ('donor_initials', models.CharField(blank=True, max_length=5)),
                ('thumbnail', models.ImageField(blank=True, null=True, upload_to='events/')),
                ('is_published', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Event',
                'verbose_name_plural': 'Events',
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='GalleryItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('category', models.CharField(choices=[('education', 'Education & Learning'), ('nutrition', 'Nutrition & Daily Meals'), ('arts', 'Arts & Creativity'), ('sports', 'Sports & Play'), ('celebrations', 'Celebrations & Festivals'), ('healthcare', 'Healthcare & Wellness'), ('community', 'Community & Outreach')], default='community', max_length=30)),
                ('aspect', models.CharField(choices=[('tall', 'Tall'), ('wide', 'Wide'), ('square', 'Square')], default='square', max_length=10)),
                ('image', models.ImageField(blank=True, null=True, upload_to='gallery/')),
                ('image_url', models.URLField(blank=True, null=True)),
                ('date', models.CharField(blank=True, max_length=50)),
                ('location', models.CharField(blank=True, max_length=255)),
                ('summary', models.TextField(blank=True)),
                ('story', models.TextField(blank=True)),
                ('impact', models.CharField(blank=True, max_length=255)),
                ('likes', models.PositiveIntegerField(default=0)),
                ('author', models.CharField(blank=True, max_length=100)),
                ('author_role', models.CharField(blank=True, max_length=100)),
                ('donor_support', models.CharField(blank=True, max_length=100)),
                ('tags', models.JSONField(blank=True, default=list)),
                ('is_published', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Gallery Item',
                'verbose_name_plural': 'Gallery Items',
                'ordering': ['-created_at'],
            },
        ),
    ]
