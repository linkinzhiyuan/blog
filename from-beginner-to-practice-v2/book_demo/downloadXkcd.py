#! python3
# downloadXkcd.py - Downloads every single XKCD comic.

import requests, os, bs4

url = 'http://xkcd.com'                # starting url
os.makedirs('xkcd', exist_ok=True)     # store comics in ./xkcd
while not url.endswith('#'):
    # TODO: Download the page.
    print('Downloading xkcd %s...' % url)
    res = requests.get(url)

    res.raise_for_status()
    soup = bs4.BeautifulSoup(res.text, 'lxml')

    # TODO: Find the URL of the comic image.

    # TODO: Download the image.

    # TODO: Save the image to ./xkcd.

    # TODO: Get the Prev button's url.

print('Done.')

