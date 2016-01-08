package scenes.components;

import flambe.Component;
import flambe.display.ImageSprite;
import flambe.display.Sprite;
import flambe.display.Texture;
import flambe.Entity;

/**
 * ...
 * @author Edwin
 */
class NDiImage extends Component
{
	public var image:ImageSprite;
	public var transform:Sprite;
	public function new(texture:Texture) 
	{
		this.image = new ImageSprite(texture);
		this.transform = new Sprite();
	}
	
	override public function onAdded()
	{
		this.owner.add(this.transform);
		this.owner.addChild(new Entity().add(this.image));
		this.image.centerAnchor();
		
	}
}