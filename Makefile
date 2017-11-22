.PHONY: deploy

# When run in gocd it will be injected by environment variable
AWS_ACCOUNT?=unknown

# Common variables
STATIC_ASSETS_FOLDER=static-assets
JAVASCRIPTS_LOC=$(STATIC_ASSETS_FOLDER)/javascripts
STYLESHEETS_LOC=$(STATIC_ASSETS_FOLDER)/stylesheets
IMAGES_LOC=$(STATIC_ASSETS_FOLDER)/images

# Github variables
GITHUB_API=https://api.github.com
ORG=ukparliament
REPO=parliament.uk-static-assets_private

# Deploys to S3 without a version
deploy:
	aws s3 rm s3://$(AWS_ACCOUNT).static-assets_private/images --recursive
	aws s3 rm s3://$(AWS_ACCOUNT).static-assets_private/javascripts --recursive
	aws s3 rm s3://$(AWS_ACCOUNT).static-assets_private/stylesheets --recursive
	aws s3 sync --acl=public-read ./static-assets/ s3://$(AWS_ACCOUNT).static-assets_private
