class Progress{
    // получить длину окружности по формуле 2*Pi*R
    static getCircumference(radius){
        return 2 * Math.PI * radius;
    }
    // получить дельту между полной длиной окружности и длиной в процентах
    static getOffset(circumference, percent){
        return circumference - percent / 100 * circumference;
    }

    constructor(props){
        const {
            selectorProgress, // блок
            selectorCircle, // прогресс бар
            selectorValue, // текстовое поле со значением
            selectorAnimate, // переключатель анимации
            selectorHide, // переключатель видимости блока
        } = props;

        this.$circle = document.querySelector(selectorCircle);
        const radius = this.$circle.r.baseVal.value;
        const circumference = Progress.getCircumference(radius);
        this.$circle.style.strokeDasharray = `${circumference} ${circumference}`;
        this.$circle.style.strokeDashoffset = `${circumference}`;
        this.$circle.style.transformOrigin = 'center';
        this.$circle.style.transform = 'rotate(-90deg)';
        this.$circle.style.transition = 'stroke-dashoffset 0.3s';

        this.$value = document.querySelector(selectorValue);
        this.$value.addEventListener('change', (e) => {

            const min = +this.$value.min;
            const max = +this.$value.max;
            const value = e.target.value;

            if(value < min){
                this.$value.value = min;
            } else if (value > max){
                this.$value.value = max;
            } else {
                this.$value.value = value;
            }

            const offset = Progress.getOffset(circumference, this.$value.value);
            this.$circle.style.strokeDashoffset = `${offset}`;
        })

        const $switcherAnimate = document.querySelector(selectorAnimate);
        $switcherAnimate.addEventListener('change', () => {
            $switcherAnimate.classList.toggle('switcher-active');
            this.$circle.classList.toggle('animate');
        })

        const $switcherHide = document.querySelector(selectorHide);
        $switcherHide.addEventListener('change', () => {
            $switcherHide.classList.toggle('switcher-active');
            const $block = document.querySelector(selectorProgress);
            $block.classList.toggle('hide');
        })
    }
}