FROM cdrx/pyinstaller-windows

WORKDIR /cpp-ticket

COPY ./Backend/requirements.txt requirements.txt
RUN mkdir -p ~/.pip && \
    echo "[global]\n\
index-url = https://pypi.tuna.tsinghua.edu.cn/simple\n\
trusted-host = pypi.tuna.tsinghua.edu.cn" > ~/.pip/pip.conf && \
    python -m pip install --upgrade pip && \
    pip install -r requirements.txt && \
    pip install --upgrade pip setuptools && \
    pip install --upgrade pyinstaller 


COPY ./Backend/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]

LABEL org.opencontainers.image.authors="castamere"
