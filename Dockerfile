FROM cypress/included:13.6.0

WORKDIR /home/cypress/

COPY . /home/cypress/

RUN npm install

CMD ["npx", "cypress", "run"]
