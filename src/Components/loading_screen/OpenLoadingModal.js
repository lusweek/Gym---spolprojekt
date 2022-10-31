

export default function openLoadingModal(){

    document.querySelector('#loading-screen').style.display="flex"
    const opa = () => document.querySelector('#loading-screen').style.opacity="1"

    setTimeout(opa, 10)

}