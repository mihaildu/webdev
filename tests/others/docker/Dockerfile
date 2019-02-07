# use a parent docker image
FROM python:2.7-slim

# change directory (I think this is inside docker)
WORKDIR /app

# copy everything from cwd to docker in /app (one time thing?)
COPY . /app

# run this shell cmd (one time thing?)
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# open port 80 on container ...
EXPOSE 80

# define env var NAME=World
ENV NAME World

# run python app.py on startup of container
CMD ["python", "app.py"]
