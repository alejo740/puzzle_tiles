package scenes;
import flambe.display.Font;
import flambe.display.ImageSprite;
import flambe.display.TextSprite;
import flambe.display.Texture;
import flambe.Entity;
import flambe.input.PointerEvent;
import flambe.script.CallFunction;
import flambe.script.Delay;
import flambe.script.Script;
import flambe.script.Sequence;
import flambe.System;
import globals.NDiGameConstants;
import managers.NDiEnemyManager;
import managers.NDiHud;
import managers.NDiPlayerManager;
import managers.NDiResourcesManager;
import managers.NDiSceneManager;
import managers.NDiTutorialEnemyManager;
import managers.NDiTutorialTokenManager;
import scenes.components.NDiButton;
import scenes.popups.NDiTutorialDialog;

/**
 * NDiTeravision
 * @author Edwin Cobos
 */
class NDiTutorialScene extends NDiGamePlayScene
{
	public var currentStep:Int;
	public var entityHighLights:Entity;
	private var popupTutorial:NDiTutorialDialog;	
	
	public function new() 
	{
		super();
		this.currentStep = 0;
		this.puzzleBoard.onRemoved();
		this.puzzleBoard = new NDiTutorialTokenManager(this);
		this.entityHighLights = new Entity();
		this.enemyManager = new NDiTutorialEnemyManager(this);
	}
	
	private function addDialogs()
	{
		this.popupTutorial = new NDiTutorialDialog(this, handlePointerUp);
		this.owner.addChild(new Entity().add(this.popupTutorial));		
		/*
		NDiResourcesManager.getInstance().addGenericText(
		"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 
		0, 0, 1, NDiGameConstants.FONT_CALIBRI, TextAlign.Left, this.owner);		
		*/
	}
	
	public function hideDialog(delay:Float)
	{	
		this.popupTutorial.transform.alpha.animateTo(0, 0.15);
		
		var f1:CallFunction = new CallFunction(function() {
			if (this.currentStep <= 2)
			{
				this.popupTutorial.changeText();
				this.popupTutorial.transform.alpha.animateTo(1, 0.15);				
			}
		});
		
		var seq:Sequence = new Sequence([new Delay(delay), f1]);
		this.rootEntity.get(Script).run(seq);
	}
	
	public function endingTutorial()
	{
		var f1:CallFunction = new CallFunction(function() {
			NDiSceneManager.getInstance().changeScene(NDI_TYPE_SCENE_GAMEPLAY);
		});
		
		var seq:Sequence = new Sequence([new Delay(0), f1]);
		this.rootEntity.get(Script).run(seq);
	}
	
	public function changeStep()
	{
		//this.parentGamePlayScene.gamePause(false);
		//trace("SKIPPPPPP "+this.currentStep);
		this.endingTutorial();
		
	}
	
	override public function gameOver()
	{		
		this.playerManager.setLife(100);		
		this.hud.updatePlayerLife(this.playerManager.getLife());
	}
	
	private function handlePointerUp(event:PointerEvent):Void 
	{
		var tmpButton:NDiButton = cast(event.hit, NDiButton);
		if (tmpButton.isSelected)
		{
			if (tmpButton.nameButton == "SKIP_BUTTON")
			{
				this.changeStep();
			}
		}
	}
	
	public function activeTimerEnemy()
	{
		cast(this.enemyManager, NDiTutorialEnemyManager).activeTimer = true;
	}
	
	override public function onAdded():Void
    {
		super.onAdded();
		this.owner.addChild(this.entityHighLights);
		this.addDialogs();		
	}
	
	override public function gamePause(active:Bool = true){}	
	override private function addDebugSystem(){}	
}