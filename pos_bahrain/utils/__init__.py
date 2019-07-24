from functools import partial
from toolz import keyfilter, compose, curry


def pick(whitelist, d):
    return keyfilter(lambda k: k in whitelist, d)


@curry
def sum_by(key, iterand):
    return compose(sum, partial(map, lambda x: x.get(key)))(iterand)
