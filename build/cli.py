# Requires jinja2, click and boto (or some s3 client)

# Take from user
# - version (default env)
# - build_number (default '')

# Usage:
# - build: only builds image, generate kubernetes templates
# - release: builds docker image, pushes to docker hub, deploys demo (dev) to s3
import os
from subprocess import check_output

import click
from jinja2 import Environment, FileSystemLoader

VERSION = 'dev'
IMAGE = 'holandes22/kube-admin'


def build_docker_image(image):
    cmd = ['docker', 'build', '-qt', image, '.']
    check_output(cmd)


def generate_manifests(path, kwargs, out='kubernetes'):
    loader = FileSystemLoader(path)
    env = Environment(loader=loader)
    for name in loader.list_templates():
        template = env.get_template(name)
        fname = os.path.join(out, name.replace('.j2', ''))
        with open(fname, 'w') as f:
            f.write(template.render(**kwargs))


def bundle_manifests():
    pass


def push_docker_image():
    pass


def build_ember(env='production', out='build/dist'):
    cmd = ['ember', 'build', '--environment', env, '--output-path', out]
    check_output(cmd)


def deploy_demo():
    pass


@click.group()
@click.option('--version', default='dev')
@click.option('--image', default='holandes22/kube-admin')
@click.pass_context
def cli(ctx, version, image):
    ctx.obj['tpl_kwargs'] = {
        'version': version,
        'image': '{}:{}'.format(image, version)
    }


@cli.command()
@click.pass_context
def build(ctx):
    click.echo('Building')
    build_ember()
    build_docker_image(ctx.obj['tpl_kwargs']['image'])


@cli.command()
@click.pass_context
def release(ctx):
    click.echo('Releasing')
    generate_manifests('templates', ctx.obj['tpl_kwargs'])


if __name__ == '__main__':
    cli(obj={})

