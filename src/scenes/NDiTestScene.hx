package scenes;

import flambe.asset.AssetPack;
import flambe.asset.Manifest;
import flambe.display.ImageSprite;
import flambe.Entity;
import flambe.swf.MoviePlayer;
import flambe.System;
import globals.NDiGameConstants;
import scenes.NDiAbstractScene;
import managers.NDiResourcesManager;

class NDiTestScene extends NDiAbstractScene
{
	private var rootEntity:Entity;
	
	public function new()
    {
    	super();
    }
    
    override public function onAdded():Void
    {
		super.onAdded();
		var background:ImageSprite = new ImageSprite( NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/panels/tiles/jewel_blue") );
		
		this.rootEntity = new Entity();
		this.rootEntity.add(background);
		this.owner.addChild(this.rootEntity);
		
		/*
		trace("ANIMATIONS BALL");
		var anm:MoviePlayer = NDiResourcesManager.getInstance().loadAnimation( NDiGameConstants.ASSET_PACKAGE_TEST_1, "test2", "Symbol1");
		this.rootEntity = new Entity();
		this.rootEntity.add(anm);
		this.owner.addChild(this.rootEntity);
		anm.movie._.x._ = System.stage.width / 2;
		anm.movie._.y._ = System.stage.height / 2;
		*/
    }

	override public function onRemoved():Void
	{
	}

	override public function onUpdate(dt:Float):Void
	{
		super.onUpdate(dt);
	}
}
