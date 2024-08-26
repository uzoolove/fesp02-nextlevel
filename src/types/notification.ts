import { CommonType } from "@/types/common";
import { ReplyUser } from "@/types/user";

export interface NotiMessageType extends CommonType{
  target_id: number;
  content: string;
  type: string;
  channel: string;
  user: ReplyUser;
  isRead: boolean;
}

export interface NotiRes {
  list: NotiMessageType[];
  newNoti: NotiMessageType;
}
