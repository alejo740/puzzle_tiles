package scenes.popups;

import data.NDiLocalizationData;
import flambe.Component;
import flambe.display.Font.TextAlign;
import flambe.display.Sprite;
import flambe.display.TextSprite;
import flambe.display.Texture;
import flambe.Entity;
import globals.NDiGameConstants;
import managers.NDiLocalizationManager;
import managers.NDiResourcesManager;
import scenes.components.NDiImage;

/**
 * ...
 * @author Edwin
 */
class NDiPopupLoading extends Component
{
	private var background:NDiImage;
	private var textLoading:TextSprite;
	
	public var transform:Sprite;
	
	public function new() 
	{
		this.transform = new Sprite();
		this.transform.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		this.transform.y._ = NDiGameConstants.GAME_HEIGHT * 0.5;
		
		var backgroundTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/backgrounds/loading_bg");
		this.background = new NDiImage(backgroundTexture);
		
		var data1:NDiLocalizationData = NDiLocalizationManager.getInstance().getLocalizationData("loading_scenes|loading_text");
		this.textLoading = NDiResourcesManager.addGenericText(data1.content, 
		320 + data1.offsetX,
		220 + data1.offsetY,
		data1.fontScale,
		data1.fontName,
		TextAlign.Left);		
	}
	
	override public function onAdded():Void
    {
		super.onAdded();
		this.owner.add(this.transform);
		
		
		
		this.owner.addChild(new Entity().add(this.background));
		this.owner.addChild(new Entity().add(this.textLoading));
	}
	
}