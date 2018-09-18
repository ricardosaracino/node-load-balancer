FROM centos:7

RUN yum -y update

RUN yum install -y httpd

RUN yum -y install mod_ssl

COPY load-balancer-httpd.conf /etc/httpd/conf.d/

COPY /ssl/server.crt /etc/pki/tls/certs/

COPY /ssl/server.key /etc/pki/tls/private/

EXPOSE 80
EXPOSE 443

CMD ["/usr/sbin/httpd","-D","FOREGROUND"]

# docker build -t load-balancer-httpd .

# run in bg
# docker run --rm -dit --name loadb -p 80:80 -p 443:443 -v "%cd%/public/:/var/www/html" load-balancer-httpd

# get command prompt
# docker run --rm -it --name loadb -p 80:80 -p 443:443 -v "%cd%/public/:/var/www/html" load-balancer-httpd

# to see output
# docker run --rm --name loadb -p 80:80 -p 443:443 -v "%cd%/public/:/var/www/html" load-balancer-httpd