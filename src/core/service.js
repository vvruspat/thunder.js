class Service {
    
    create () {
        let request;
        
        try {
            request = new XMLHttpRequest();
        } catch (e) {
            throw new Error("XMLHttpRequest not found", e);
        }
        return request;
    }
    
    http (url, method = 'GET', params = [], body = null) {
        return new Promise(function (resolve, reject) {
            let request = this.create();

            request.open(method, url, true);
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        resolve(request.responseText);
                    } else {
                        reject(request.responseText);
                    }
                }
            };
            request.send(body);
        }.bind(this));
    }
    
    get (url, params) {
        return this.http(url, 'GET', params);
    }
    
    put (url, params, body) {
        return this.http(url, 'PUT', params, body);
    }
    
    post (url, params, body) {
        return this.http(url, 'POST', params, body);
    }
    
    delete (url, params) {
        return this.http(url, 'DELETE', params);
    }
    
}