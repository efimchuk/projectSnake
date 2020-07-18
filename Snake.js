class Snake extends EventTarget{
    constructor(gameField){
        super();
        this.body = new Array();
        this.lastPlace = {x:0, y:0};
        this.millisecondsPerStep = 100;

        let newSegment = {x: 0, y: 0, div:null};

        for(let i = 0; i < 3; i++){
            if(gameField.isFreeCell(newSegment)){
                gameField.takeСell(newSegment);
                this.body.push(newSegment);
            } else if(gameField.isFreeCell({x:newSegment.x + 1, y: newSegment.y})){
                newSegment = {x:newSegment.x + 1, y: newSegment.y, div:null};
                gameField.takeСell(newSegment);
                this.body.push(newSegment);
            } else if(gameField.isFreeCell({x:newSegment.x, y: newSegment.y + 1})){
                newSegment = {x:newSegment.x, y: newSegment.y + 1, div:null};
                gameField.takeСell(newSegment);
                this.body.push(newSegment);
            } else {
                if(newSegment.x + 1 < gameField.maxX){
                    newSegment = {x: newSegment.x + 1, y: newSegment.y, div:null};
                } else if(newSegment.y + 1 < gameField.maxY){
                    newSegment = {x: newSegment.x, y: newSegment + y, div:null};
                } else {
                    if(this.body.length != 0){
                        break;
                    }
                }

                i = i - 1;
                continue;
            }
        }

        this.direction = {
            x: this.body[0].x - this.body[1].x, 
            y: this.body[0].y - this.body[1].y
        };

        console.log(this.body);
    }

    move(){
        this.intervalId = setInterval(this.makeStep.bind(this), this.millisecondsPerStep);
    }

    stop(){
        clearInterval(this.intervalId);
    }

    addSegment(){
        this.body.push({x:this.lastPlace.x + 1, y: this.lastPlace.y, div:null});

        this.dispatchEvent(new CustomEvent('GrowUp', {detail: this.body}));
    }

    makeStep(){
        this.lastPlace.x = this.body[this.body.length - 1].x;
        this.lastPlace.y = this.body[this.body.length - 1].y;

        for(let i = this.body.length - 1; i > 0; i--){
            let curSegment = this.body[i];
            let prevSergment = this.body[i - 1];
            curSegment.x = prevSergment.x;
            curSegment.y = prevSergment.y;
        }

        this.body[0].x += this.direction.x;
        this.body[0].y += this.direction.y;

        this.dispatchEvent(new CustomEvent('Step', {detail: this.body}));
        this.draw();
    }
    
    changeDirection(newDirection){
        let firstSegment = this.body[0];
        let secondSegment = this.body[1];

        if(firstSegment.x + newDirection.x == secondSegment.x ||
            firstSegment.y + newDirection.y == secondSegment.y){
            return;
        }

        let detail = {
            oldDirection: this.direction,
            newDirection: newDirection
        }

        this.direction = newDirection;

        this.dispatchEvent(new CustomEvent('ChangeDirection', {detail: detail}));
    }

    draw(){
        for(let i = 0; i < this.body.length; i++){

            let curSegment = this.body[i];

            let div = curSegment.div;
        
            if(i == 0){
                div.style.backgroundImage = 'url(images/snakeHead.png)';

                switch(this.direction.y){
                    case -1: div.style.transform = 'rotate(0)'; break;
                    case 1 : div.style.transform = 'rotate(180deg)'; break;
                }

                switch(this.direction.x){
                    case -1: div.style.transform = 'rotate(-90deg)'; break;
                    case 1 : div.style.transform = 'rotate(90deg)'; break;
                }

            } else if(i == this.body.length - 1){
                div.style.backgroundImage = 'url(images/snakeTail.png)';

                let lDirection = {
                    x: this.body[i - 1].x - curSegment.x,
                    y: this.body[i - 1].y - curSegment.y
                };

                switch(lDirection.y){
                    case -1: div.style.transform = 'rotate(0)'; break;
                    case 1 : div.style.transform = 'rotate(180deg)'; break;
                }

                switch(lDirection.x){
                    case -1: div.style.transform = 'rotate(-90deg)'; break;
                    case 1 : div.style.transform = 'rotate(90deg)'; break;
                }
            } else {
                if((curSegment.x == this.body[i - 1].x && curSegment.x == this.body[i + 1].x) ||
                    (curSegment.y == this.body[i - 1].y && curSegment.y == this.body[i + 1].y)){
                    div.style.backgroundImage = 'url(images/snakeBody1.png)';

                    let lDirection = {
                        x: this.body[i - 1].x - curSegment.x,
                        y: this.body[i - 1].y - curSegment.y
                    };
    
                    switch(lDirection.y){
                        case -1: div.style.transform = 'rotate(0)'; break;
                        case 1 : div.style.transform = 'rotate(180deg)'; break;
                    }
    
                    switch(lDirection.x){
                        case -1: div.style.transform = 'rotate(-90deg)'; break;
                        case 1 : div.style.transform = 'rotate(90deg)'; break;
                    }
                } else {
                    div.style.backgroundImage = 'url(images/snakeBody2.png)';

                    let directions = '';

                    if(this.body[i - 1].x - curSegment.x == -1 || this.body[i + 1].x - curSegment.x == -1){
                        directions = directions + 'left';
                    }

                    if(this.body[i - 1].x - curSegment.x == 1 || this.body[i + 1].x - curSegment.x == 1){
                        directions = directions + 'right';
                    }

                    if(this.body[i - 1].y - curSegment.y == -1 || this.body[i + 1].y - curSegment.y == -1){
                        directions = directions + 'top';
                    }

                    if(this.body[i - 1].y - curSegment.y == 1 || this.body[i + 1].y - curSegment.y == 1){
                        directions = directions + 'bottom';
                    }

                    if(directions.indexOf('left') != -1 && directions.indexOf('bottom') != -1){
                        div.style.transform = 'rotate(0)';
                    } else if(directions.indexOf('left') != -1 && directions.indexOf('top') != -1){
                        div.style.transform = 'rotate(90deg)';
                    } else if(directions.indexOf('right') != -1 && directions.indexOf('top') != -1){
                        div.style.transform = 'rotate(180deg)';
                    } else if(directions.indexOf('right') != -1 && directions.indexOf('bottom') != -1){
                        div.style.transform = 'rotate(-90deg)';
                    }
                }
            }

            div.style.backgroundPosition = 'center';
            div.style.backgroundSize = 'cover';
        }
    }
}