const Interval = {
    refreshIntervalId: null,
    start: (func, time=5000) => {
        Interval.refreshIntervalId = setInterval(func, time)
    },
    stop: () => {
        if (Interval.refreshIntervalId) {
            clearInterval(Interval.refreshIntervalId)
        }
    },
}

const luz = {
    "vermelho": document.querySelector('.luz.vermelho'),
    "amarelo": document.querySelector('.luz.amarelo'),
    "verde": document.querySelector('.luz.verde'),
}

Object.keys(luz).forEach(cor => {
    luz[cor].addEventListener('click', () => {
        if (!document.querySelector(`.luz.${cor}`).classList.contains('ligado')) {
            Interval.stop()
            ciclo(obterOrdem(obterOrdem(cor)))
            Interval.start(ciclo)
        }
    })
})

let luzLigadoAtual = ""

function obterOrdem(luz) {
    const ordem = {
        "vermelho": "verde",
        "amarelo": "vermelho",
        "verde": "amarelo",
    }

    return ordem[luz] || null;
}

function ligarLuz(luzLigar=null) {
    Object.keys(luz).forEach(key => {
        if (key != luzLigar) {
            luz[key].classList.remove('ligado')
        }
    })

    if (luzLigar == null) {
        luz["verde"].classList.add('ligado')
    } else {
        luz[luzLigar].classList.add('ligado')
    }

}

function ciclo(luzLigado=luzLigadoAtual) {
    luzLigadoAtual = luzLigadoAtual == "" ? "verde" : obterOrdem(luzLigado)
    ligarLuz(luzLigadoAtual)
}
ciclo()

Interval.start(ciclo)