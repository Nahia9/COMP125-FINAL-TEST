let Game = (function(){

    // variable declarations
    let canvas:HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage:createjs.Stage;
    let assets: createjs.LoadQueue;
    //dice labels
    let diceLabel1: UIObjects.Label;
    let diceLabel2: UIObjects.Label;
    let resultLabel: UIObjects.Label;
    //Game buttons
    let rollButton: UIObjects.Button;
    let resetButton : UIObjects.Button;
    //dices
    let diceNumber1 : Core.GameObject;
    let diceNumber2 : Core.GameObject;
    //Background
    let background : Core.GameObject;
    let leftbanner : Core.GameObject;
    let rightbanner : Core.GameObject;
    // randomNumbers
    let randomNumber1 = 0;
    let randomNumber2 = 0;
    let result = 0;

    let assetManifest = 
    [
        {id:"1", src:"./Assets/images/1.png"},
        {id:"2", src:"./Assets/images/2.png"},
        {id:"3", src:"./Assets/images/3.png"},
        {id:"4", src:"./Assets/images/4.png"},
        {id:"5", src:"./Assets/images/5.png"},
        {id:"6", src:"./Assets/images/6.png"},
        {id:"background", src:"./Assets/images/background1.jpg"},
        {id:"banner", src:"./Assets/images/banner1.jpg"},
        {id:"resetButton", src:"./Assets/images/resetButton.png"},
        {id:"rollButton", src:"./Assets/images/rollButton.png"},
    ];

    function Preload():void
    {
        console.log(`%c Preload Function`, "color: grey; font-size: 14px; font-weight: bold;");
        assets = new createjs.LoadQueue(); // asset container 
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }

    
     //This method initializes the CreateJS (EaselJS) Library
     //It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
    function Start():void
    {
        console.log(`%c Start Function`, "color: grey; font-size: 14px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = Config.Game.FPS;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        
        Config.Game.ASSETS = assets; // make a reference to the assets in the global config

        Main();
    }
     //This function is triggered every frame (16ms).The stage is then erased and redrawn 
    function Update():void
    {
        stage.update();
    }

    //function for creating objects
    function buildInterface() 
    {
        //create background
        background = new Core.GameObject("background", Config.Game.CENTER_X, Config.Game.CENTER_Y, true);
        stage.addChild(background);

        //Adding starting image
        leftbanner = new Core.GameObject("banner", Config.Game.CENTER_X - 160, Config.Game.CENTER_Y - 90, true);
        stage.addChild(leftbanner);

        rightbanner = new Core.GameObject("banner", Config.Game.CENTER_X + 160, Config.Game.CENTER_Y - 90, true);
        stage.addChild(rightbanner);
        
        // Adding Buttons
        rollButton = new UIObjects.Button("rollButton", Config.Game.CENTER_X, Config.Game.CENTER_Y + 100, true);
        stage.addChild(rollButton);

        resetButton = new UIObjects.Button("resetButton", Config.Game.CENTER_X, Config.Game.CENTER_Y + 170, true);
        stage.addChild(resetButton);
        
    }

    // game logic goes here
    function interfaceLogic() 
    {
        
        rollButton.on("click", () => 
        {
            console.log("Roll Button clicked");
            randomNumber1 = Math.floor((Math.random() * 6) + 1);
            randomNumber2 = Math.floor((Math.random() * 6) + 1);
            result = randomNumber1 + randomNumber2;

            //Removing all the previous dice rollings and labels
            stage.removeChild(diceLabel1, diceLabel2, resultLabel);
            
            //Showing the random no. Dices
            diceNumber1 = new Core.GameObject(randomNumber1.toString(), Config.Game.CENTER_X - 160, Config.Game.CENTER_Y - 90, true);
            stage.addChild(diceNumber1);

            diceNumber2 = new Core.GameObject(randomNumber2.toString(), Config.Game.CENTER_X + 160, Config.Game.CENTER_Y - 90, true);
            stage.addChild(diceNumber2)

            //Adding and showing randomly generated no. and result in  Dice labels
            diceLabel1 = new UIObjects.Label(randomNumber1.toString(), "30px", "Consolas", "#000000", Config.Game.CENTER_X - 160, Config.Game.CENTER_Y + 25, true);
            stage.addChild(diceLabel1);
            diceLabel2 = new UIObjects.Label(randomNumber2.toString(), "30px", "Consolas", "#000000", Config.Game.CENTER_X + 160, Config.Game.CENTER_Y + 25, true);
            stage.addChild(diceLabel2);
            resultLabel = new UIObjects.Label(result.toString(), "30px", "Consolas", "#000000", Config.Game.CENTER_X, Config.Game.CENTER_Y + 45, true);
            stage.addChild(resultLabel);

        });

        resetButton.on("click", () =>
        {
            console.log("reset Button clicked");
            //Removing all the previous dice rollings and labels
            stage.removeChild(diceNumber1, diceNumber2, diceLabel1, diceLabel2, resultLabel)

        });

    }
    
     //This is the main function of the Game (where all the fun happens)
    function Main():void
    {
        console.log(`%c Main Function`, "color: grey; font-size: 14px; font-weight: bold;");

        buildInterface();
        interfaceLogic();
    }

    window.addEventListener('load', Preload);
})();