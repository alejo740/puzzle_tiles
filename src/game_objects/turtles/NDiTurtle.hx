package game_objects.turtles;
import flambe.display.Sprite;
import flambe.Entity;
import flambe.swf.Library;
import flambe.swf.MoviePlayer;
import globals.NDiGameConstants;
import globals.NDiGameConstants.NDiTypeToken;
import managers.NDiAudioManager;

/**
 * ...
 * @author Edwin Cobos
 */
class NDiTurtle extends MoviePlayer
{
	public var isAlive:Bool;
	public var type:NDiTypeToken;
	public var transform:Sprite;
	public var turtleName:String;
	public var indexTurtle:Int;
	public var isBlocked:Bool;

	public function new(lib:Library):Void
	{
		super(lib);
		this.isAlive = true;
		this.transform = new Sprite();
		this.type = NDiTypeToken.NDI_TYPE_TURTLE_NONE;
		this.turtleName = super.name;
		this.isBlocked = false;
	}
	
	public function animationFall()
	{
		this.play(this.turtleName + "_land");
		NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.SOUND_TMNT_FALL);
	}
	
	public function animationJump()
	{
		this.play(this.turtleName + "_jump");
	}
	
	public function animationDamage()
	{
		this.play(this.turtleName + "_hitReceive");
	}
	
	public function animationIdle()
	{
		this.loop(this.turtleName + "_idle");
	}
	
	override public function onAdded():Void
    {
		super.onAdded();
		this.owner.add(this.transform);
		///trace("INIT PLAYERS");
		
	}
	
	public function delete():Void
	{		
		this.owner.dispose();
	}
}