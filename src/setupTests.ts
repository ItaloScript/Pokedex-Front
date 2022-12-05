import '@testing-library/jest-dom'


// mock IntersectionObserver
(window as any).IntersectionObserver = class IntersectionObserver{
    callback: any

    constructor(callback: any){
        this.callback = callback;
        return;
    }
    disconnect = () => {
        return;
    }
    observe = () => {
        return this.callback([{isIntersecting: false}])
    }
    takeRecords = () => {
        return;
    }
    unobserve = () => {
        return this.callback([{isIntersecting: false}])
    }
} 

