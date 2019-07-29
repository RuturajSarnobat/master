import { Component } from '@angular/core';
import { NavController, LoadingController, ActionSheetController } from 'ionic-angular';
import { MusicsProvider } from '../../providers/musics/musics';
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { MusicPlayerPage } from "../music-player/music-player"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	public allMusic = [];

  constructor(public navCtrl: NavController,
  private socialSharing: SocialSharing,
  private actionSheetController: ActionSheetController,
  public LoadingController: LoadingController,
   private musicProvider: MusicsProvider) {
  
  }
  ionViewDidLoad(){
  	let allMusicLoadingController = this.LoadingController.create({
  		content:"getting your songs from server"
  	});
  	allMusicLoadingController.present();

  	this.musicProvider.getMusic()
  	  	.subscribe((musicList) => 
  	  		{
  	  		allMusicLoadingController.dismiss();
  	  		this.allMusic = musicList});
  }
  shareSong(music){
  	let shareSongActionSheet = this.actionSheetController.create({
  		title:"Share Song",
  		buttons:[
  		{
  			text:"Share on Facebook",
  			icon:"logo-facebook",
  			handler:()=>{
  			this.socialSharing.shareViaFacebook(music.name,music.image, music.music_url)
  			}
  		},
  		{
  			text:"Twitter",
  			icon:"logo-twitter",
  			handler:()=>{
  			this.socialSharing.shareViaTwitter(music.name,music.image, music.music_url)}
  		},
  		{
  			text:"Share",
  			icon:"share",
  			handler:()=>{
  			this.socialSharing.share(music.name,"",music.image, music.music_url)}
  		},
  		{
  			text:"Cancel",
  			role:"destructive"
  		}

  		]
  	});
  	shareSongActionSheet.present();
  }
  gotoMusic(music){
  	this.navCtrl.push(MusicPlayerPage,{
  	   music: music
  	});
  }

}
