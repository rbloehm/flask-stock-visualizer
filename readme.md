# This fork
While following the tutorial's blog post, I noticed that most of the packages were quite outdated or deprecated, so I updated them and adapted the code (especially for the d3 part) accordingly. 
* package manager
** bower -> yarn
* packages
** bootstrap 4.1.3
** d3 5.7.0
** jquery 3.3.1
* python packages
** pandas instead of requests+csv

I also use the Anaconda distributions of python, so I replaced the requirements.txt with a corresponding environment.yml file for conda.

As I was not interested in the deployment part of this tutorial, the corresponding parts have been removed.

# Fun with Flask

1. Fetching Data with Requests
1. Visualizing with D3
1. Deploying with Dokku

Check out the blog post: [https://realpython.com/blog/python/web-development-with-flask-fetching-data-with-requests/](https://realpython.com/blog/python/web-development-with-flask-fetching-data-with-requests/)
