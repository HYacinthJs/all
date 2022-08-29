import axios from 'axios'
import qs from 'qs' // 将url中的参数转为对象；将对象转为url参数形式


axios.defaults.withCredentials = true

// 发送时
axios.interceptors.request.use(config => {
    // 开始
    return config
}, err => {
    return Promise.reject(err)
})

// 响应时
axios.interceptors.response.use(response => response, err => Promise.resolve(err.response))

// 检查状态码
function checkStatus(res) {
    // 结束
    if (res.status === 200 || res.status === 304) {
        return res.data
    }
    // 检查CODE值时阻止程序运行，打印错误
    return {
        code: 0,
        msg: res.data.msg || res.statusText,
        data: res.statusText
    }
    return res
}


// 检查CODE值
function checkCode(res) {
    if (res.code === 0) {
        throw new Error(res.msg)
    }

    return res
}

const baseURL = 'http://localhost:8081/'


export default {
    get(url, params) {
        if (!url) return
        return axios({
            method: 'get',
            url: baseURL + url,
            params,
            timeout: 30000
        }).then(checkStatus).then(checkCode)
    },
    post(url, data) {
        if (!url) return
        return axios({
            method: 'post',
            url: baseURL + url,
            data: qs.stringify(data),
            timeout: 30000
        }).then(checkStatus).then(checkCode)
    },
    postFile(url, data) {
        if (!url) return
        return axios({
            method: 'post',
            url: baseURL + url,
            data
        }).then(checkStatus).then(checkCode)
    }
}
