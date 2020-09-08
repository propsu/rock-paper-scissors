document.addEventListener('DOMContentLoaded', function(){
    const game = {
        ring: document.querySelector('#fight'),
        actions: document.querySelectorAll('.action'),
        moves: ['rock', 'paper', 'scissors'],
        advantages: {
            rock: 'scissors',
            scissors: 'paper',
            paper: 'rock', 
        },
        info: document.querySelector('#fightInfo'),
        init(){
            this.bindEvents();
        },
        bindEvents(){
            this.actions.forEach((act)=>{
                act.addEventListener('click', (e)=>{
                    this.play(e.currentTarget.dataset.move);
                });
            });
        },
        randComputerMove(){
            let min = 0;
            let max = 2;
            let index = Math.floor(Math.random() * (max - min + 1) + min);

            return this.moves[index];
        },
        checkWinner(p1, p2){
            let winner = 'Draw';
            if(this.advantages[p1] === p2)
                winner = 'Player';
            if(this.advantages[p2] === p1)
                winner = 'Computer';

            return winner;
        },
        play(p1){
            this.ring.innerHTML = '';
            const p2 = this.randComputerMove();
            this.count(3).then(res=>{
                this.fight(p1, p2);

                const winner = this.checkWinner(p1, p2);
                this.info.innerHTML = winner;
            });
            
        },
        count(sec, speed = 1){
            return new Promise((resolve, reject)=>{
                this.info.innerHTML = sec;
                sec--;

                const interval = setInterval(()=>{
                    this.info.innerHTML = sec;

                    if(sec == 0){
                        clearInterval(interval);
                        this.info.innerHTML = '';
                        resolve(true);
                    }

                    sec--;
                
                }, 1000 * speed);
            });
        },
        fight(p1, p2){
            const handP1 = document.createElement('img');
            handP1.src = 'images/'+p1+'.svg';
            handP1.classList.add('hand-player1');
            handP1.classList.add('hand');

            this.ring.append(handP1);
            
            const handP2 = document.createElement('img');
            handP2.src = 'images/'+p2+'.svg';
            handP2.classList.add('hand-player2');
            handP2.classList.add('hand');

            this.ring.append(handP2);
        }
    }

    game.init();
});