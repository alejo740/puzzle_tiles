package scenes;

import flambe.animation.Ease;
import flambe.script.AnimateTo;
import flambe.display.FillSprite;
import flambe.display.ImageSprite;
import flambe.display.Sprite;
import flambe.display.TextSprite;
import flambe.display.Texture;
import flambe.Entity;
import flambe.display.Font;
import flambe.input.PointerEvent;
import flambe.script.CallFunction;
import flambe.script.Delay;
import flambe.script.Script;
import flambe.script.Sequence;
import flambe.sound.Sound;
import flambe.asset.AssetPack;
import flambe.System;
import scenes.NDiAbstractScene;
import managers.NDiSceneManager;
import managers.NDiResourcesManager;
import globals.NDiGameConstants;
import data.NDiCreditData;
import scenes.components.NDiButton;
import haxe.Timer;
import haxe.xml.Fast;

class NDiCreditsScene extends NDiAbstractScene
{

	private var background:ImageSprite;
	private var logo:ImageSprite;
	private var rootEntity:Entity;
	//private var font1:Font;
	private var textStudio:TextSprite;
	private var textTitle:TextSprite;
	private var textNames:TextSprite;
	private var script:Script;
	private var credits:Array<NDiCreditData>;
	private var creditIndex:Int =0; /*Current credit index*/
	
	public function new() 
	{
		super();
		this.rootEntity = new Entity();
		
		this.script = new Script();		
		this.rootEntity.add(this.script);
	}
	
	private function loadCreditsXML()
	{
		credits = new Array<NDiCreditData>();
		
		var textFile:String = NDiResourcesManager.getInstance().loadXML(NDiGameConstants.ASSET_PACKAGE_CONFIG, 
																		NDiGameConstants.CONFIG_ASSET_CREDITS_XML);
		
		/*Credits root node with all the info*/
		var myXML = new Fast(Xml.parse(textFile).firstElement());
		var studioName:String = "";
		
		for ( studioNode in myXML.nodes.studio ) 
		{
			/*Studio name*/
			trace(studioNode.att.name);
			studioName = studioNode.att.name;
			
			for ( creditNode in studioNode.nodes.credit ) 
			{
				var credit= new NDiCreditData();
				credit.studio = studioName; 
				/*Credit title*/
				trace(creditNode.node.title.innerData);
				credit.title = creditNode.node.title.innerData;
				
				var names:String= "";
				/*Credit name(s)*/
				for ( nameNode in creditNode.nodes.name ) 
				{
					names += nameNode.innerData + "\n";
				}
				trace(names);
				
				credit.name = names;
				
				this.credits.push(credit);
			}
		}
	}
	
	private function loadNextTitle() 
	{	
		
		this.script.run(new Sequence([
			new AnimateTo(this.textNames.alpha, 0, 0.4),
			new AnimateTo(this.textTitle.alpha, 0, 0.4),
			new Delay(1.0),
			new CallFunction(function () 
			{
				setCreditStudio("Credits\n("+this.credits[creditIndex].studio+")", 500, 150);
				trace("CHANGE CREDITS CONTENT");
				setTitle(this.credits[creditIndex].title, 500, 250);
				setName(this.credits[creditIndex].name, 500, 300);
			}),
			new AnimateTo(this.textTitle.alpha, 0.8, 0.4),
			new AnimateTo(this.textNames.alpha, 0.8, 0.4),
			new CallFunction(function () 
			{
				trace("NEXT CREDITS CHANGE");
				haxe.Timer.delay(loadNextTitle, NDiGameConstants.CREDITS_DURATION);
			})
		]));
		
		creditIndex++;
		if (creditIndex >= this.credits.length) creditIndex = 0;
	}
	
	private function addBackground()
	{
		var backgroundTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.CREDITS_BACKGROUND);
		this.background = new ImageSprite(backgroundTexture);
		this.background.centerAnchor();
		this.background.y._ = NDiGameConstants.GAME_HEIGHT * 0.5;
		this.background.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		this.rootEntity.addChild(new Entity().add(this.background));
		
	}
	
	private function addButtonBack()
	{
		var texture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.CREDITS_BUTTON_BACK);
		var sprite:ImageSprite = new ImageSprite(texture);
		sprite.centerAnchor();
		sprite.y._ = NDiGameConstants.GAME_HEIGHT * 0.25-80;
		sprite.x._ = NDiGameConstants.GAME_WIDTH * 0.25-200;
		sprite.pointerDown.connect(function(event:PointerEvent) {
				NDiSceneManager.getInstance().changeScene(NDI_TYPE_SCENE_MAINMENU);
			});
		this.rootEntity.addChild(new Entity().add(sprite));
		
	}
	
	private function addCreditsTitle()
	{
		var texture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.CREDITS_TITLE);
		var sprite:ImageSprite = new ImageSprite(texture);
		sprite.centerAnchor();
		sprite.y._ = NDiGameConstants.GAME_HEIGHT * 0.25-80;
		sprite.x._ = NDiGameConstants.GAME_WIDTH * 0.5+20;
		this.rootEntity.addChild(new Entity().add(sprite));
	}
	
	private function setTitle( message:String= "Default title",  posX:Int =500,  posY:Int =500)
	{	
		
		this.textTitle.text = message;
		this.textTitle.align = TextAlign.Center;
		this.textTitle.x._ = posX;
		this.textTitle.y._ = posY;
		
	}
	
	private function setName( message:String= "Default name",  posX:Int =500,  posY:Int =500)
	{
		
		this.textNames.text = message;
		this.textNames.align = TextAlign.Center;
		this.textNames.x._ = posX;
		this.textNames.y._ = posY;
		
	}
	
	private function setCreditStudio( message:String= "Credits",  posX:Int =500,  posY:Int =500)
	{
		
		textStudio.text = message;
		textStudio.align = TextAlign.Center;
		textStudio.x._ = posX;
		textStudio.y._ = posY;
		
	}
	
	override public function onAdded():Void
    {
		super.onAdded();
		this.owner.addChild(this.rootEntity);
		//this.font1 = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.FONT_CALIBRI);
		
		loadCreditsXML();
		
		/*Add Background*/
		this.addBackground();
		
		/*Add credits text*/
		/*
		this.textTitle = new TextSprite(this.font1, "");
		this.textNames = new TextSprite(this.font1, "");
		this.textStudio = new TextSprite(this.font1, "");
		*/
		
		this.owner.addChild(new Entity().add(textTitle));
		this.owner.addChild(new Entity().add(textNames));
		this.owner.addChild(new Entity().add(textStudio));
		
		setCreditStudio("Credits", 500, 150);
		
		/*CYCLES TROUGH THE LIST OF CREDITS*/
		loadNextTitle();
		
		/*BACK BUTTON*/
		this.addButtonBack();
		/*CREDITS TITLE*/
		this.addCreditsTitle();
		
	}
	
}