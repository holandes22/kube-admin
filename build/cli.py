import os
import tarfile
from subprocess import check_output

import click
from jinja2 import Environment, FileSystemLoader


def build_docker_image(image):
    click.echo('Build docker image')
    cmd = ['docker', 'build', '-qt', image, '.']
    check_output(cmd)


def push_docker_image(image):
    click.echo('Pushing docker image')
    cmd = ['docker', 'push', image]


def generate_manifests(path, kwargs, out='kubernetes'):
    loader = FileSystemLoader(path)
    env = Environment(loader=loader)
    for name in loader.list_templates():
        template = env.get_template(name)
        fname = os.path.join(out, name.replace('.j2', ''))
        with open(fname, 'w') as f:
            f.write(template.render(**kwargs))


def bundle_kube_scripts(path, out='kubernetes.tar.gz'):
    click.echo('Bundling kube script and manifests')
    with tarfile.open(out, "w:gz") as tar:
        tar.add(path, arcname='kube-admin')


def build_ember(env='production', out='build/dist'):
    click.echo('Building ember with env {}'.format(env))
    cmd = ['ember', 'build', '--environment', env, '--output-path', out]
    check_output(cmd)


def deploy():
    click.echo('Deploying demo')
    cmd = ['ember', 'deploy:dev']


@click.group()
@click.option('--version', default='dev')
@click.option('--image', default='holandes22/kube-admin')
@click.pass_context
def cli(ctx, version, image):
    ctx.obj['kwargs'] = {
        'version': version,
        'image': '{}:{}'.format(image, version)
    }


@cli.command()
@click.pass_context
def build(ctx):
    click.echo('Building')
    build_ember()
    build_docker_image(ctx.obj['kwargs']['image'])


@cli.command()
@click.pass_context
def release(ctx):
    click.echo('Releasing')
    image = ctx.obj['kwargs']['image']
    #build_ember()
    #build_docker_image(image)
    #push_docker_image(image)

    deploy()

    generate_manifests('templates', ctx.obj['kwargs'])
    bundle_kube_scripts('kubernetes')


if __name__ == '__main__':
    cli(obj={})
