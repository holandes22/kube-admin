import os
import tarfile

import click
from jinja2 import Environment, FileSystemLoader

ROOT_PATH = os.path.dirname(__file__)


def generate_manifests(path, kwargs, pkg_name):
    click.echo('Generate manifest')
    loader = FileSystemLoader(path)
    env = Environment(loader=loader)
    out = os.path.join(ROOT_PATH, 'kubernetes')
    for name in loader.list_templates():
        template = env.get_template(name)
        fname = os.path.join(out, name.replace('.j2', ''))
        with open(fname, 'w') as f:
            f.write(template.render(**kwargs))
    with tarfile.open(pkg_name, "w:gz") as tar:
        tar.add(out, arcname='kube-admin')


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
def release(ctx):
    click.echo('Releasing')

    templates_path = os.path.join(ROOT_PATH, 'templates')
    version = ctx.obj['kwargs']['version']
    package_name = 'kube-admin-k8s-{}.tar.gz'.format(version)
    package_name = os.path.join(ROOT_PATH, package_name)

    generate_manifests(templates_path, ctx.obj['kwargs'], package_name)


if __name__ == '__main__':
    cli(obj={})
