FROM quay.io/xelectra/xasena:latest
RUN git clone https://github.com/X-Electra/X-asena-QR /root/xasenaqr
WORKDIR /root/xasenaqr/
RUN npm install npm@latest
RUN yarn install --network-concurrency 1
EXPOSE 8000
CMD ["npm", "start"]