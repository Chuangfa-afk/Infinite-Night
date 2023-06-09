import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import HW3Level, { HW3Layers, LevelEvents } from "./Level";
import RenderingManager from "../../Wolfie2D/Rendering/RenderingManager";
import SceneManager from "../../Wolfie2D/Scene/SceneManager";
import Viewport from "../../Wolfie2D/SceneGraph/Viewport";
import Layer from "../../Wolfie2D/Scene/Layer";
import HW3AnimatedSprite from "../Nodes/HW3AnimatedSprite";
import PlayerController from "../Player/PlayerController";
import Emitter from "../../Wolfie2D/Events/Emitter";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import { HW3Events } from "../HW3Events";
import Input from "../../Wolfie2D/Input/Input";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import Rect from "../../Wolfie2D/Nodes/Graphics/Rect";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import Color from "../../Wolfie2D/Utils/Color";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import MainMenu from "./MainMenu";
import { HW3Controls } from "../HW3Controls";
import Level1 from "./Level1";
import Level2 from "./Level2";
import Level4 from "./Level4";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";

export const Level3Events = {
    //Facing F
    PLANT: "PLANT",
    PLANTHIDE: "PLANTHIDE",
    ELEVATOR: "ELEVATOR",
    ELEVATORHIDE: "ELEVATORHIDE",
    WATERMACHINE: "WATERMACHINE",
    WATERMACHINEHIDE: "WATERMACHINEHIDE",
    //Facing L
    LIGHT: "LIGHT",
    LIGHTHIDE: "LIGHTHIDE",
    DIPLOMA: "DIPLOMA",
    DIPLOMAHIDE: "DIPLOMAHIDE",
    TRASH: "TRASH",
    TRASHHIDE: "TRASHHIDE",
    COMPUTERL: "COMPUTERL",
    COMPUTERLHIDE: "COMPUTERLHIDE",
    FLOWER: "FLOWER",
    FLOWERHIDE: "FLOWERHIDE",
    EXIT: "EXIT",
    EXITHIDE: "EXITHIDE",

    //Facing R
    KEYBOARD: "KEYBAORD",
    KEYBOARDHIDE: "KEYBOARDHIDE",
    SAFE: "SAFE",
    SAFEHIDE: "SAFEHIDE",
    COMPUTER: "COMPUTER",
    COMPUTERHIDE: "COMPUTERHIDE",
    CUP: "CUP",
    CUPHIDE: "CUPHIDE",
    PAPER: "PAPER",
    PAPERHIDE: "PAPERHIDE",
    //Facing B
    LOCKERS: "LOCKERS",
    LOCKERSHIDE: "LOCKERSHIDE",
    CLOCK: "CLOCK",
    CLOCKHIDE: "CLOCKHIDE",
    
} as const;
/**
 * The first level for HW4 - should be the one with the grass and the clouds.
 */
export default class Level3 extends HW3Level {

    public static readonly MUSIC_KEY = "LEVEL_3_MUSIC";
    public static readonly MUSIC_PATH = "Level3_assets/music/Level_3.wav";

    public static readonly BACKGROUND_KEY = "BACKGROUND";
    public static readonly BACKGROUND_PATH = "Level3_assets/Level_3.json";

    public static readonly KEYBOARD_KEY = "KEYBOARD";
    public static readonly KEYBOARD_PATH = "Level3_assets/keyboard.png";

    public static readonly PAPER_KEY = "PAPER";
    public static readonly PAPER_PATH = "Level3_assets/paper.png";

    public static readonly ID_KEY = "ID";
    public static readonly ID_PATH = "Level3_assets/ID.png";

    public static readonly LOCKERS_KEY = "LOCKERS";
    public static readonly LOCKERS_PATH = "Level3_assets/lockers.png";

    public static readonly DIPLOMA_KEY = "DIPLOMA";
    public static readonly DIPLOMA_PATH = "Level3_assets/diploma.png";

    public static readonly RAT_KEY = "RAT";
    public static readonly RAT_PATH = "Level3_assets/rat.png";

    protected background: Layer;
    public ui: Layer;
    public bg: HW3AnimatedSprite;
    public primary: Sprite;
    public clock2: Sprite;
    public key: Sprite;
    public dialogue: Rect;
    public line1: Label;
    public line2: Label;
    public drawer1: Sprite;
    public drawer2: Sprite;
    public sign1: Sprite;
    public sign2: Sprite;
    public narration: Rect;

    //facingF
    public waterMachine: Sprite;
    public elevator: Sprite;
    public plant: Sprite;

    //facingR
    public keyboard: Sprite;
    public paper: Sprite;
    public id: Sprite;

    //facingB
    public lockers: Sprite;
    
    //facingL
    public diploma: Sprite;
    public rat: Sprite;

    protected emitter: Emitter;
    public hasId: Boolean = false;
    public hasKey: Boolean = false;
    public pop_up: Boolean = false;

    public constructor(viewport: Viewport, sceneManager: SceneManager, renderingManager: RenderingManager, options: Record<string, any>) {
        super(viewport, sceneManager, renderingManager, options);
        this.emitter = new Emitter();
    }

    /**
     * Load in our resources for level 1
     */
    public loadScene(): void {
        this.load.spritesheet(Level3.BACKGROUND_KEY, Level3.BACKGROUND_PATH);
        this.load.image(Level3.KEYBOARD_KEY, Level3.KEYBOARD_PATH);
        this.load.image(Level3.PAPER_KEY, Level3.PAPER_PATH);
        this.load.image(Level3.ID_KEY, Level3.ID_PATH);
        this.load.audio(Level3.MUSIC_KEY, Level3.MUSIC_PATH);
        this.load.image(Level3.LOCKERS_KEY, Level3.LOCKERS_PATH);
        this.load.image(Level3.DIPLOMA_KEY, Level3.DIPLOMA_PATH);
        this.load.image(Level3.RAT_KEY, Level3.RAT_PATH);
    }

    /**
     * Unload resources for level 1 - decide what to keep
     */
    public unloadScene(): void {
        /*
        this.load.keepAudio(this.levelMusicKey);
        this.load.keepAudio(this.jumpAudioKey);
        this.load.keepAudio(this.tileDestroyedAudioKey);
        */
        this.load.keepSpritesheet(MainMenu.LEFT_KEY);
        this.load.keepSpritesheet(MainMenu.RIGHT_KEY);
        this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: Level3.MUSIC_KEY});

    }

    public startScene(): void {
        this.emitter.fireEvent(LevelEvents.LEVEL_3);
        //Subscribe to event
        //FF
        this.receiver.subscribe(Level3Events.ELEVATOR);
        this.receiver.subscribe(Level3Events.ELEVATORHIDE);
        this.receiver.subscribe(Level3Events.PLANT);
        this.receiver.subscribe(Level3Events.PLANTHIDE);
        this.receiver.subscribe(Level3Events.WATERMACHINE);
        this.receiver.subscribe(Level3Events.WATERMACHINEHIDE);
        //FL
        this.receiver.subscribe(Level3Events.LIGHT);
        this.receiver.subscribe(Level3Events.LIGHTHIDE);
        this.receiver.subscribe(Level3Events.DIPLOMA);
        this.receiver.subscribe(Level3Events.DIPLOMAHIDE);
        this.receiver.subscribe(Level3Events.TRASH);
        this.receiver.subscribe(Level3Events.TRASHHIDE);
        this.receiver.subscribe(Level3Events.COMPUTERL);
        this.receiver.subscribe(Level3Events.COMPUTERLHIDE);
        this.receiver.subscribe(Level3Events.FLOWER);
        this.receiver.subscribe(Level3Events.FLOWERHIDE);
        this.receiver.subscribe(Level3Events.EXIT);
        this.receiver.subscribe(Level3Events.EXITHIDE);


        //FR
        this.receiver.subscribe(Level3Events.PAPER);
        this.receiver.subscribe(Level3Events.PAPERHIDE);
        this.receiver.subscribe(Level3Events.COMPUTER);
        this.receiver.subscribe(Level3Events.COMPUTERHIDE);
        this.receiver.subscribe(Level3Events.CUP);
        this.receiver.subscribe(Level3Events.CUPHIDE);
        this.receiver.subscribe(Level3Events.SAFE);
        this.receiver.subscribe(Level3Events.SAFEHIDE);
        this.receiver.subscribe(Level3Events.KEYBOARD);
        this.receiver.subscribe(Level3Events.KEYBOARDHIDE);
        //FB
        this.receiver.subscribe(Level3Events.CLOCK);
        this.receiver.subscribe(Level3Events.CLOCKHIDE);
        this.receiver.subscribe(Level3Events.LOCKERS);
        this.receiver.subscribe(Level3Events.LOCKERSHIDE);

        this.background = this.addUILayer("background");
        this.addParallaxLayer("BACKGROUND", new Vec2(0.5, 1), -1);
        this.bg = this.add.animatedSprite(Level3.BACKGROUND_KEY, HW3Layers.BACKGROUND);
        this.bg.position.set(248, 400);
        this.bg.scale = new Vec2(0.25, 0.25);
        this.bg.addAI(PlayerController);

        super.startScene();
        this.initializeUserInterface();
        this.nextLevel = Level4;
        
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: Level3.MUSIC_KEY, loop: true, holdReference: true});

    }

    /**
     * Handle game events. 
     * @param event the game event
     */
    protected handleEvent(event: GameEvent): void {
        switch (event.type) {
            //FF
            case Level3Events.PLANT: {
                this.handlePlant(event);
                break;
            }
            case Level3Events.PLANTHIDE: {
                this.handlePlantHide(event);
                break;
            }
            case Level3Events.ELEVATOR: {
                this.handleElevator(event);
                break;
            }
            case Level3Events.ELEVATORHIDE: {
                this.handleElevatorHide(event);
                break;
            }
            case Level3Events.WATERMACHINE: {
                this.handleWaterMachine(event);
                break;
            }
            case Level3Events.WATERMACHINEHIDE: {
                this.handleWaterMachineHide(event);
                break;
            }
            //FL
            case Level3Events.LIGHT: {
                this.handleLight(event);
                break;
            }
            case Level3Events.LIGHTHIDE: {
                this.handleLightHide(event);
                break;
            }
            case Level3Events.DIPLOMA: {
                this.handleDiploma(event);
                break;
            }
            case Level3Events.DIPLOMAHIDE: {
                this.handleDiplomaHide(event);
                break;
            }
            case Level3Events.TRASH: {
                this.handleTrash(event);
                break;
            }
            case Level3Events.TRASHHIDE: {
                this.handleTrashHide(event);
                break;
            }
            case Level3Events.COMPUTERL: {
                this.handleComputerl(event);
                break;
            }
            case Level3Events.COMPUTERLHIDE: {
                this.handleComputerlHide(event);
                break;
            }
            case Level3Events.FLOWER: {
                this.handleFlower(event);
                break;
            }
            case Level3Events.FLOWERHIDE: {
                this.handleFlowerHide(event);
                break;
            }
            case Level3Events.EXIT: {
                this.handleExit(event);
                break;
            }
            case Level3Events.EXITHIDE: {
                this.handleExitHide(event);
                break;
            }
            //FR
            case Level3Events.KEYBOARD: {
                this.handleKeyboard(event);
                break;
            }
            case Level3Events.KEYBOARDHIDE: {
                this.handleKeyboardHide(event);
                break;
            }
            case Level3Events.PAPER: {
                this.handlePaper(event);
                break;
            }
            case Level3Events.PAPERHIDE: {
                this.handlePaperHide(event);
                break;
            }
            case Level3Events.COMPUTER: {
                this.handleComputer(event);
                break;
            }
            case Level3Events.COMPUTERHIDE: {
                this.handleComputerHide(event);
                break;
            }
            case Level3Events.SAFE: {
                this.handleSafe(event);
                break;
            }
            case Level3Events.SAFEHIDE: {
                this.handleSafeHide(event);
                break;
            }
            case Level3Events.CUP: {
                this.handleCup(event);
                break;
            }
            case Level3Events.CUPHIDE: {
                this.handleCupHide(event);
                break;
            }

            //FB

            case Level3Events.LOCKERS: {
                this.handleLockers(event);
                break;
            }
            case Level3Events.LOCKERSHIDE: {
                this.handleLockersHide(event);
                break;
            }
            case Level3Events.CLOCK: {
                this.handleClock(event);
                break;
            }
            case Level3Events.CLOCKHIDE: {
                this.handleClockHide(event);
                break;
            }



            case HW3Events.LEVEL_START: {
                Input.enableInput();
                this.handleLevelStart(event);
                break;
            }
            case HW3Events.PLAYER_ENTERED_LEVEL_END: {
                super.handleEnteredLevelEnd();
                break;
            }
            case HW3Events.LEVEL_END: {
                this.sceneManager.changeToScene(this.nextLevel);
                break;
            }
            // Default: Throw an error! No unhandled events allowed.
            default: {
                throw new Error(`Unhandled event caught in scene with type ${event.type}`)
            }
        }
    }

    public updateScene(deltaT: number): void {
        super.updateScene(deltaT);
        if(Input.isJustPressed(HW3Controls.LEVEL_1,)) {
            this.sceneManager.changeToScene(Level1);
        }
        else if(Input.isJustPressed(HW3Controls.LEVEL_2,)) {
            this.sceneManager.changeToScene(Level2);
        }
        else if(Input.isJustPressed(HW3Controls.LEVEL_3,)) {
            this.sceneManager.changeToScene(Level3);
        }
        else if(Input.isJustPressed(HW3Controls.LEVEL_4,)) {
            this.sceneManager.changeToScene(Level4);
        }

        if(Input.isMouseJustPressed(0)) {
            if(this.narration.visible) {
                this.narration.visible = false;
                this.line1.visible = false;
                this.line2.visible = false;
            }
        }
    }

    protected initializeViewport(): void {
        super.initializeViewport();
        this.viewport.setBounds(16, 16, 496, 512);
    }

    protected initializeUserInterface(): void {
        //Put all images here
        this.dialogue = <Rect>this.add.graphic(GraphicType.RECT, HW3Layers.PRIMARY, { position: new Vec2(400, 500), size: new Vec2(1000, 100) });
        this.dialogue.scale = new Vec2(0.5, 0.5);
        this.dialogue.color = new Color(0, 0, 0, 0.5);
        this.dialogue.visible = false;    

        this.keyboard = this.add.sprite(Level3.KEYBOARD_KEY, HW3Layers.PRIMARY);
        this.keyboard.position.set(350, 400);
        this.keyboard.scale = new Vec2(0.12, 0.1);
        this.keyboard.visible = false;

        this.paper = this.add.sprite(Level3.PAPER_KEY, HW3Layers.PRIMARY);
        this.paper.position.set(350, 400);
        this.paper.scale = new Vec2(0.2, 0.2);
        this.paper.visible = false;

        this.id = this.add.sprite(Level3.ID_KEY, HW3Layers.PRIMARY);
        this.id.position.set(350, 400);
        this.id.scale = new Vec2(0.2, 0.2);
        this.id.visible = false;

        this.lockers = this.add.sprite(Level3.LOCKERS_KEY, HW3Layers.PRIMARY);
        this.lockers.position.set(350, 400);
        this.lockers.scale = new Vec2(0.2, 0.2);
        this.lockers.visible = false;

        this.diploma = this.add.sprite(Level3.DIPLOMA_KEY, HW3Layers.PRIMARY);
        this.diploma.position.set(350, 400);
        this.diploma.scale = new Vec2(0.2, 0.2);
        this.diploma.visible = false;

        this.rat = this.add.sprite(Level3.RAT_KEY, HW3Layers.PRIMARY);
        this.rat.position.set(350, 400);
        this.rat.scale = new Vec2(0.2, 0.2);
        this.rat.visible = false;

        this.narration = <Rect>this.add.graphic(GraphicType.RECT, HW3Layers.PRIMARY, { position: new Vec2(400, 500), size: new Vec2(1000, 100) });
        this.narration.scale = new Vec2(0.5, 0.5);
        this.narration.color = new Color(0, 0, 0, 0.5);
        this.narration.visible = false;
        
        
    }

    //Handle show dialogue with sprites
    

    //Handle show general dialogue boxes --> no images required
    protected handlePlant(event: GameEvent): void {
        if (!this.dialogue.visible){
            this.dialogue.visible = true;
            const text1 = "These plants are kinda cute, in an interior-design-kinda way.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }

    }
    protected handlePlantHide(event: GameEvent): void {
        if (this.dialogue.visible) {
            this.line1.visible = false;
            this.dialogue.visible = false;
        }
    }
    protected handleWaterMachine(event: GameEvent): void {
        if (!this.dialogue.visible){
            this.dialogue.visible = true;
            const text1 = "There's no more water! I've gotta refill it later.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }

    }
    protected handleWaterMachineHide(event: GameEvent): void {
        if (this.dialogue.visible) {
            this.line1.visible = false;
            this.dialogue.visible = false;
        }
    }
    protected handleElevator(event: GameEvent): void {
        if (!this.dialogue.visible){
            this.dialogue.visible = true;
            if(!this.hasId){
                this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.INCORRECT_AUDIO_KEY, loop: false, holdReference: false});

                const text1 = "[ACCESS DENIED] I really should've remembered my ID back at home...";
                this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
                this.line1.textColor = Color.WHITE;
                this.line1.visible = true;
            }
            else {
                this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.CORRECT_AUDIO_KEY, loop: false, holdReference: false});

                const text1 = "[ACCESS APPROVED] This is such a hassle.";
                this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
                this.line1.textColor = Color.WHITE;
                this.line1.visible = true;
                this.emitter.fireEvent(HW3Events.PLAYER_ENTERED_LEVEL_END);
            }
        }

    }
    protected handleElevatorHide(event: GameEvent): void {
        if (this.dialogue.visible) {
            this.line1.visible = false;
            this.dialogue.visible = false;
        }
    }

    protected handleKeyboard(event: GameEvent): void {
        if(!this.keyboard.visible) {
            this.keyboard.visible = true;
            this.dialogue.visible = true;
            
            const text1 = "Hm, what's this?";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.fontSize = 50;
            this.line1.visible = true;
        }
    }

    protected handleKeyboardHide(event: GameEvent): void {
        if(this.keyboard.visible) {
            this.keyboard.visible = false;
            this.dialogue.visible = false;
            this.line1.visible = false;
        }
    }

    protected handlePaper(event: GameEvent): void {
        if(!this.paper.visible) {
            this.paper.visible = true;
            this.dialogue.visible = true;
            
            const text1 = "Hm, this pattern looks vaguely familiar...";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.fontSize = 50;
            this.line1.visible = true;
        }
    }

    protected handlePaperHide(event: GameEvent): void {
        if(this.paper.visible) {
            this.paper.visible = false;
            this.dialogue.visible = false;
            this.line1.visible = false;
        }
    }

    protected handleSafe(event: GameEvent): void {
        if (!this.dialogue.visible && !this.hasId){
            this.dialogue.visible = true;
            const passcode = prompt("[PLEASE ENTER YOUR SIX-DIGIT PASSCODE]");
            if( (passcode === "CSE380") || (passcode === "cse380")){
                this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.CORRECT_AUDIO_KEY, loop: false, holdReference: false});

                const text1 = "It opened! Oh, look! This ID will probably get me access.";
                this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
                this.line1.textColor = Color.WHITE;
                this.line1.visible = true;
                this.id.visible = true;
                this.hasId = true;
                // You can add any additional logic here for what happens when the correct passcode is entered
            } else {
                this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.INCORRECT_AUDIO_KEY, loop: false, holdReference: false});

                const text1 = "Should I really be snooping in here? (Hint: the order of the keys matter!)";
                this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
                this.line1.textColor = Color.WHITE;
                this.line1.visible = true;
            }
        }
    }
    protected handleSafeHide(event: GameEvent): void {
        if (this.dialogue.visible) {
            this.line1.visible = false;
            this.dialogue.visible = false;
            this.id.visible = false;
        }
    }

    protected handleCup(event: GameEvent): void {
        if (!this.dialogue.visible){
            this.dialogue.visible = true;
            const text1 = "Someone really just left their half-empty cup here.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }

    }
    protected handleCupHide(event: GameEvent): void {
        if (this.dialogue.visible) {
            this.line1.visible = false;
            this.dialogue.visible = false;
        }
    }

    protected handleComputer(event: GameEvent): void {
        if (!this.dialogue.visible){
            this.dialogue.visible = true;
            const text1 = "The computer screen's a little dusty. Lemme wipe it...";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }

    }
    protected handleComputerHide(event: GameEvent): void {
        if (this.dialogue.visible) {
            this.line1.visible = false;
            this.dialogue.visible = false;
        }
    }

    protected handleLockers(event: GameEvent): void {
        if(!this.lockers.visible) {
            this.lockers.visible = true;
            this.dialogue.visible = true;
            
            const text1 = "All the lockers here are locked. (Why are they even in an office?)";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.fontSize = 30;
            this.line1.visible = true;
        }

    }
    protected handleLockersHide(event: GameEvent): void {
        if(this.lockers.visible) {
            this.lockers.visible = false;
            this.dialogue.visible = false;
            this.line1.visible = false;
        }
    }

    protected handleClock(event: GameEvent): void {
        if (!this.dialogue.visible){
            this.dialogue.visible = true;
            const text1 = "All these clocks are wrong...";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }

    }
    protected handleClockHide(event: GameEvent): void {
        if (this.dialogue.visible) {
            this.line1.visible = false;
            this.dialogue.visible = false;
        }
    }

    //------------------------------------------------------------------------------
    protected handleLight(event: GameEvent): void {
        if (!this.dialogue.visible){
            this.dialogue.visible = true;
            const text1 = "The light's still on. (Geez, these employees...)";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }

    }
    protected handleLightHide(event: GameEvent): void {
        if (this.dialogue.visible) {
            this.line1.visible = false;
            this.dialogue.visible = false;
        }
    }
    protected handleDiploma(event: GameEvent): void {
        if(!this.diploma.visible) {
            this.diploma.visible = true;
            this.dialogue.visible = true;
            
            const text1 = "Heh, nice diploma.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.fontSize = 36;
            this.line1.visible = true;
        }

    }
    protected handleDiplomaHide(event: GameEvent): void {
        if(this.diploma.visible) {
            this.diploma.visible = false;
            this.dialogue.visible = false;
            this.line1.visible = false;
        }
    }
    protected handleTrash(event: GameEvent): void {
        if(!this.pop_up){
            this.pop_up = true;
            if(!this.rat.visible) {
                this.rat.visible = true;
                this.dialogue.visible = true;
                
                const text1 = "OH, **** IT'S A RAT!!!";
                this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
                this.line1.textColor = Color.WHITE;
                this.line1.fontSize = 50;
                this.line1.visible = true;
            }
        }
        if (!this.dialogue.visible){
            this.dialogue.visible = true;
            const text1 = "Why did I choose this profession...";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }

    }
    protected handleTrashHide(event: GameEvent): void {
        if (this.dialogue.visible) {
            this.line1.visible = false;
            this.dialogue.visible = false;
            this.rat.visible = false;
        }
    }
    protected handleComputerl(event: GameEvent): void {
        if (!this.dialogue.visible){
            this.dialogue.visible = true;
            const text1 = "This screen's kinda filthy. Time to wipe it down.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }

    }
    protected handleComputerlHide(event: GameEvent): void {
        if (this.dialogue.visible) {
            this.line1.visible = false;
            this.dialogue.visible = false;
        }
    }
    protected handleFlower(event: GameEvent): void {
        if (!this.dialogue.visible){
            this.dialogue.visible = true;
            const text1 = "These flowers have a pleasant aroma.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }

    }
    protected handleFlowerHide(event: GameEvent): void {
        if (this.dialogue.visible) {
            this.line1.visible = false;
            this.dialogue.visible = false;
        }
    }
    protected handleExit(event: GameEvent): void {
        if (!this.dialogue.visible){
            this.dialogue.visible = true;
            const text1 = "If I want to exit, I have to use the elevator. (No stairs for me!)";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }

    }
    protected handleExitHide(event: GameEvent): void {
        if (this.dialogue.visible) {
            this.line1.visible = false;
            this.dialogue.visible = false;
        }
    }

    protected handleLevelStart(event: GameEvent): void {
        this.narration.visible = true;

        const text1 = "Why is the light already turned on when no one's here?";
        const text2 = "Oh, wow, it smells awful in here.";
        this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 470), text: text1});
        this.line1.textColor = Color.WHITE;
        this.line2 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 480), text: text2});
        this.line2.textColor = Color.WHITE;
        this.line1.visible = true;
        this.line2.visible = true;
    }

}