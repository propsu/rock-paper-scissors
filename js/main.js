document.addEventListener('DOMContentLoaded', function(){
    const game = {
        ring: document.querySelector('#fight'),
        mainDiv: document.querySelector('.game'),
        actions: document.querySelectorAll('.action'),
        hands: document.querySelectorAll('.hand'),
        endTitles: {
            background: document.querySelector('.end-titles--background'),
            header: document.querySelector('.end-titles--header'),
            button: document.querySelector('.end-titles--new_game'),
        },
        info: document.querySelector('#fightInfo'),
        moves: ['rock', 'paper', 'scissors'],
        advantages: {
            rock: 'scissors',
            scissors: 'paper',
            paper: 'rock', 
        },
        player: {
            health: 100,
            healthbar: document.querySelector('#playerHealthbar'),
        },
        computer: {
            health: 100,
            healthbar: document.querySelector('#computerHealthbar'),
        },
        config: {
            speed: .5,
            rounds: 3,
            count: 3,
        },
        init(){
            this.damage = 100 / this.config.rounds;
            this.bindEvents();
        },
        bindEvents(){
            this.actions.forEach((act)=>{
                act.addEventListener('click', (e)=>{
                    this.play(e.currentTarget.dataset.move);
                });
            });

            this.endTitles.button.addEventListener('click', this.resetGame.bind(this));

        },
        randComputerMove(){
            let index = Math.floor(Math.random() * 3);

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
            this.replaceHand('hand-player1', 'rock');
            this.replaceHand('hand-player2', 'rock');
            const p2 = this.randComputerMove();
            this.hands.forEach(hand=>{
                hand.style.animationDuration = this.config.speed * this.config.count + 's';
                hand.classList.add('shake');
            });

           
            this.count(this.config.count).then(res=>{
                this.hands.forEach(hand=>{
                    hand.classList.remove('shake');
                });

                this.replaceHand('hand-player1', p1);
                this.replaceHand('hand-player2', p2);

                const winner = this.checkWinner(p1, p2);
                this.takeDamage(winner.toLowerCase());
                this.info.innerHTML = winner;
            });
            
        },
        count(sec){
            return new Promise(resolve=>{
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
                
                }, 1000 * this.config.speed);
            });
        },
        replaceHand(handClass, move){
            document.querySelector('.' + handClass).src = 'images/svg/' + move + '.svg';
        },
        createHand(player, move){
            const hand = document.createElement('img');
            hand.src = 'images/svg/'+move+'.svg';
            hand.classList.add('hand-player' + player);
            hand.classList.add('hand');
            this.ring.append(hand);
        },
        takeDamage(player){
            const victim = this.getOppositePlayer(player);

            if(victim){
                this[victim].health -= Math.ceil(this.damage);
                this[victim].healthbar.style.width = this[victim].health + '%';
                if(this[victim].health <= 0)
                    this.endGame(player);
            }
        },
        endGame(winner){
            this.endTitles.header.classList.remove('win');
            this.endTitles.header.classList.remove('lose');

            const result = winner == 'player' ? 'Win' : 'Lose';

            this.endTitles.background.classList.remove('hidden');
            this.endTitles.header.classList.add(result.toLowerCase());
            this.endTitles.header.innerHTML = result;

        },
        getOppositePlayer(player){
            if(player == 'draw') 
                return null;

            return player == 'player' ? 'computer' : 'player';
        },
        resetGame(){
            this.endTitles.background.classList.add('hidden');
            this.player.health = 100;
            this.player.healthbar.style.width = 100 + '%';

            this.computer.health = 100;
            this.computer.healthbar.style.width = 100 + '%';
            this.info.innerHTML = '';
            this.replaceHand('hand-player1', 'rock');
            this.replaceHand('hand-player2', 'rock');
        }
    }

    game.init();
});