class Base62 {
    constructor(user) {
        const baseChars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const additionalCharsNeeded = Math.max(0, baseChars.length - user.length);
        const additionalChars = baseChars.slice(0, additionalCharsNeeded);
        this.chars = user + additionalChars;
        this.base = this.chars.length;
    }

    encode(num) {
        let encoded = '';
        while (num) {
            const remainder = num % this.base;
            num = Math.floor(num / this.base);
            encoded = this.chars[remainder].toString() + encoded;
        }
        return encoded || '0';
    }

    decode(str) {
        let decoded = 0;
        for (let i = 0; i < str.length; i++) {
            const index = this.chars.indexOf(str[i]);
            decoded += index * Math.pow(this.base, str.length - i - 1);
        }
        return decoded;
    }
}

(async function(){
    const gotcha = '_dXTaSdi'; // Ganti dengan nilai gotcha yang sesuai
    const params = (function(){let p={};location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(s,k,v){p[k]=v});return p;})();
    const spiderx = /bot|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex/i.test(navigator.userAgent);
    let paramName = null;
    let productId = null;
    for (const key in params) {
        if (Object.hasOwnProperty.call(params, key) && params[key]) {
            paramName = key;
            productId = params[key];
            break;
        }
    }
    if (paramName && productId) {
        const user = 'dikscourageing'; // Ganti 'dikscourageing' dengan nilai user yang Anda gunakan
        const base62 = new Base62(user);
        const decodedProductId = base62.decode(productId);
        if (/googlebot/i.test(navigator.userAgent)) {
            window.location.href = 'https://ko.aliexpress.com/i/' + decodedProductId + '.html';
            //window.location.href = 'https://ozora.icu/ko/item/' + decodedProductId + '.html';
        } else {
            window.location.href = 'https://s.click.aliexpress.com/deep_link.htm?aff_short_key=' + gotcha + '&dl_target_url=https://www.aliexpress.com/item/' + decodedProductId + '.html';
        }
    } else {
        console.error('No valid parameter-value pair found.');
    }
})();
