import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type Screen = 'auth' | 'chats' | 'profile' | 'settings' | 'friends' | 'music' | 'wallet' | 'shop' | 'blacklist' | 'support';

const Index = () => {
  const [screen, setScreen] = useState<Screen>('auth');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [nickname, setNickname] = useState('');
  const [authStep, setAuthStep] = useState<'phone' | 'code' | 'nickname'>('phone');
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [balance, setBalance] = useState(500);

  const chats = [
    { id: 1, name: 'Александр', username: '@alex', avatar: '', lastMessage: 'Привет! Как дела?', time: '14:32', unread: 2, online: true },
    { id: 2, name: 'Рабочий чат', username: '@work_team', avatar: '', lastMessage: 'Встреча перенесена', time: '12:15', unread: 0, online: false, isGroup: true },
    { id: 3, name: 'Мария', username: '@maria', avatar: '', lastMessage: 'Отправила фото 📷', time: 'Вчера', unread: 5, online: true },
    { id: 4, name: 'Новости IT', username: '@it_news', avatar: '', lastMessage: 'Новый релиз Python 3.13', time: 'Вчера', unread: 0, online: false, isChannel: true },
  ];

  const messages = selectedChat ? [
    { id: 1, text: 'Привет!', time: '14:30', isMine: false, sender: 'Александр' },
    { id: 2, text: 'Привет! Как дела?', time: '14:31', isMine: false, sender: 'Александр' },
    { id: 3, text: 'Отлично, спасибо! У тебя как?', time: '14:32', isMine: true },
  ] : [];

  const friends = [
    { id: 1, name: 'Александр', username: '@alex', avatar: '', online: true },
    { id: 2, name: 'Мария', username: '@maria', avatar: '', online: true },
    { id: 3, name: 'Дмитрий', username: '@dmitry', avatar: '', online: false },
  ];

  const musicTracks = [
    { id: 1, title: 'Звёздная ночь', artist: 'Indie Band', duration: '3:42' },
    { id: 2, title: 'Летний дождь', artist: 'Rock Group', duration: '4:15' },
    { id: 3, title: 'Танцы до утра', artist: 'Electronic Mix', duration: '3:28' },
  ];

  const shopItems = [
    { id: 1, name: '🎁 Подарок "Сердце"', price: 50 },
    { id: 2, name: '🌟 Подарок "Звезда"', price: 100 },
    { id: 3, name: '🎈 Подарок "Воздушный шар"', price: 30 },
    { id: 4, name: '👑 Подарок "Корона"', price: 200 },
  ];

  const handleAuth = () => {
    if (authStep === 'phone') {
      setAuthStep('code');
    } else if (authStep === 'code') {
      setAuthStep('nickname');
    } else {
      setScreen('chats');
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage('');
    }
  };

  if (screen === 'auth') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="MessageCircle" size={40} className="text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Добро пожаловать</h1>
            <p className="text-muted-foreground">Быстрый и безопасный мессенджер</p>
          </div>

          <div className="space-y-4 bg-card p-6 rounded-2xl border">
            {authStep === 'phone' && (
              <>
                <div className="space-y-2">
                  <Label>Номер телефона</Label>
                  <Input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="text-lg"
                  />
                </div>
                <Button onClick={handleAuth} className="w-full" size="lg">
                  Получить код
                </Button>
              </>
            )}

            {authStep === 'code' && (
              <>
                <div className="space-y-2">
                  <Label>Код из SMS</Label>
                  <Input
                    type="text"
                    placeholder="_ _ _ _ _ _"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="text-lg text-center tracking-widest"
                    maxLength={6}
                  />
                  <p className="text-sm text-muted-foreground text-center">
                    Код отправлен на {phoneNumber}
                  </p>
                </div>
                <Button onClick={handleAuth} className="w-full" size="lg">
                  Подтвердить
                </Button>
              </>
            )}

            {authStep === 'nickname' && (
              <>
                <div className="space-y-2">
                  <Label>Ваш никнейм</Label>
                  <Input
                    type="text"
                    placeholder="Введите никнейм"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="text-lg"
                  />
                </div>
                <Button onClick={handleAuth} className="w-full" size="lg">
                  Начать общение
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="h-14 border-b flex items-center justify-between px-4 bg-card/50 backdrop-blur">
        <Button variant="ghost" size="icon" onClick={() => setMenuOpen(true)}>
          <Icon name="Menu" size={24} />
        </Button>
        <h1 className="font-semibold text-lg">
          {screen === 'chats' && 'Чаты'}
          {screen === 'profile' && 'Профиль'}
          {screen === 'settings' && 'Настройки'}
          {screen === 'friends' && 'Друзья'}
          {screen === 'music' && 'Музыка'}
          {screen === 'wallet' && 'Кошелёк'}
          {screen === 'shop' && 'Магазин'}
          {screen === 'blacklist' && 'Чёрный список'}
          {screen === 'support' && 'Поддержка'}
        </h1>
        <Button variant="ghost" size="icon">
          <Icon name="Search" size={20} />
        </Button>
      </header>

      {screen === 'chats' && (
        <div className="flex-1 flex overflow-hidden">
          <div className={`${selectedChat ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-80 border-r`}>
            <div className="p-3">
              <Input
                placeholder="Поиск чатов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <ScrollArea className="flex-1">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className="flex items-center gap-3 p-3 hover:bg-accent/50 cursor-pointer border-b transition-colors"
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                        {chat.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    {chat.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold truncate">{chat.name}</h3>
                      <span className="text-xs text-muted-foreground">{chat.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <Badge className="bg-primary">{chat.unread}</Badge>
                  )}
                </div>
              ))}
            </ScrollArea>
          </div>

          {selectedChat ? (
            <div className="flex-1 flex flex-col">
              <div className="h-14 border-b flex items-center justify-between px-4 bg-card/50">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setSelectedChat(null)}
                  >
                    <Icon name="ArrowLeft" size={20} />
                  </Button>
                  <Avatar className="w-9 h-9">
                    <AvatarFallback className="bg-primary/20 text-primary">А</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-sm">Александр</h3>
                    <p className="text-xs text-green-500">в сети</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Icon name="Phone" size={20} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Icon name="Video" size={20} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Icon name="MoreVertical" size={20} />
                  </Button>
                </div>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          msg.isMine
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-card border'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <span className="text-xs opacity-70 mt-1 block">{msg.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Icon name="Paperclip" size={20} />
                  </Button>
                  <Input
                    placeholder="Введите сообщение..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button variant="ghost" size="icon">
                    <Icon name="Smile" size={20} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Icon name="Mic" size={20} />
                  </Button>
                  <Button size="icon" onClick={handleSendMessage}>
                    <Icon name="Send" size={20} />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex flex-1 items-center justify-center">
              <div className="text-center space-y-2">
                <Icon name="MessageSquare" size={64} className="mx-auto text-muted-foreground/50" />
                <p className="text-muted-foreground">Выберите чат для начала общения</p>
              </div>
            </div>
          )}
        </div>
      )}

      {screen === 'profile' && (
        <ScrollArea className="flex-1">
          <div className="max-w-2xl mx-auto p-4 space-y-6">
            <div className="bg-card rounded-2xl overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-primary/20 to-accent/20" />
              <div className="px-6 pb-6">
                <div className="flex items-end gap-4 -mt-16 mb-4">
                  <Avatar className="w-24 h-24 border-4 border-background">
                    <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-bold">
                      {nickname[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 pb-2">
                    <h2 className="text-2xl font-bold">{nickname || 'Пользователь'}</h2>
                    <p className="text-muted-foreground">@{nickname.toLowerCase() || 'user'}</p>
                  </div>
                  <Button>
                    <Icon name="Edit" size={16} className="mr-2" />
                    Редактировать
                  </Button>
                </div>
                <Separator className="my-4" />
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Icon name="Phone" size={18} className="text-muted-foreground" />
                    <span>{phoneNumber || '+7 (___) ___-__-__'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Mail" size={18} className="text-muted-foreground" />
                    <span>email@example.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Info" size={18} className="text-muted-foreground" />
                    <span>Это может быть ваша биография</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      )}

      {screen === 'friends' && (
        <ScrollArea className="flex-1">
          <div className="max-w-2xl mx-auto p-4 space-y-4">
            <div className="flex gap-2">
              <Input placeholder="Поиск по username..." className="flex-1" />
              <Button>
                <Icon name="UserPlus" size={20} />
              </Button>
            </div>
            {friends.map((friend) => (
              <div key={friend.id} className="bg-card rounded-xl p-4 flex items-center gap-4">
                <div className="relative">
                  <Avatar>
                    <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                      {friend.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  {friend.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{friend.name}</h3>
                  <p className="text-sm text-muted-foreground">{friend.username}</p>
                </div>
                <Button variant="outline" size="sm">
                  <Icon name="MessageCircle" size={16} className="mr-2" />
                  Написать
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}

      {screen === 'music' && (
        <div className="flex-1 flex flex-col">
          <div className="p-4 space-y-4">
            <Input placeholder="Поиск музыки..." />
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">Все треки</TabsTrigger>
                <TabsTrigger value="playlist" className="flex-1">Плейлист</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-2 mt-4">
                {musicTracks.map((track) => (
                  <div key={track.id} className="bg-card rounded-xl p-4 flex items-center gap-4">
                    <Button size="icon" variant="ghost">
                      <Icon name="Play" size={20} />
                    </Button>
                    <div className="flex-1">
                      <h3 className="font-semibold">{track.title}</h3>
                      <p className="text-sm text-muted-foreground">{track.artist}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{track.duration}</span>
                    <Button size="icon" variant="ghost">
                      <Icon name="MoreVertical" size={20} />
                    </Button>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="playlist">
                <div className="text-center py-12">
                  <Icon name="Music" size={48} className="mx-auto text-muted-foreground/50 mb-2" />
                  <p className="text-muted-foreground">Плейлист пуст</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}

      {screen === 'wallet' && (
        <ScrollArea className="flex-1">
          <div className="max-w-2xl mx-auto p-4 space-y-6">
            <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-6 text-white">
              <p className="text-sm opacity-80 mb-1">Баланс енотиков</p>
              <h2 className="text-4xl font-bold mb-4">{balance} 🦝</h2>
              <div className="flex gap-2">
                <Button className="flex-1 bg-white/20 hover:bg-white/30 border-0">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Пополнить
                </Button>
                <Button className="flex-1 bg-white/20 hover:bg-white/30 border-0">
                  <Icon name="Send" size={16} className="mr-2" />
                  Отправить
                </Button>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Тарифы</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                  <span>100 енотиков 🦝</span>
                  <span className="font-semibold">50 ₽</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                  <span>500 енотиков 🦝</span>
                  <span className="font-semibold">200 ₽</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                  <span>1000 енотиков 🦝</span>
                  <span className="font-semibold">350 ₽</span>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Верификация</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon name="BadgeCheck" size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Галочка верификации</p>
                    <p className="text-sm text-muted-foreground">50 000 ₽</p>
                  </div>
                </div>
                <Button>Получить</Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      )}

      {screen === 'shop' && (
        <ScrollArea className="flex-1">
          <div className="max-w-2xl mx-auto p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {shopItems.map((item) => (
                <div key={item.id} className="bg-card rounded-2xl p-6 text-center space-y-3">
                  <div className="text-5xl">{item.name.split(' ')[0]}</div>
                  <h3 className="font-semibold">{item.name.split(' ').slice(1).join(' ')}</h3>
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <span className="font-bold text-primary">{item.price}</span>
                    <span>🦝</span>
                  </div>
                  <Button className="w-full">Купить</Button>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      )}

      {screen === 'settings' && (
        <ScrollArea className="flex-1">
          <div className="max-w-2xl mx-auto p-4 space-y-6">
            <div className="bg-card rounded-2xl p-6 space-y-4">
              <h3 className="font-semibold text-lg">Конфиденциальность</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-online">Показывать статус</Label>
                  <Switch id="show-online" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-playlist">Публичный плейлист</Label>
                  <Switch id="show-playlist" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 space-y-4">
              <h3 className="font-semibold text-lg">Оформление</h3>
              <div className="space-y-4">
                <div>
                  <Label>Тема</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Button variant="outline" className="justify-start">
                      <Icon name="Moon" size={16} className="mr-2" />
                      Тёмная
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Icon name="Sun" size={16} className="mr-2" />
                      Светлая
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 space-y-4">
              <h3 className="font-semibold text-lg">Язык</h3>
              <Button variant="outline" className="w-full justify-between">
                Русский
                <Icon name="ChevronRight" size={16} />
              </Button>
            </div>
          </div>
        </ScrollArea>
      )}

      {screen === 'blacklist' && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-2 p-4">
            <Icon name="UserX" size={64} className="mx-auto text-muted-foreground/50" />
            <p className="text-muted-foreground">Чёрный список пуст</p>
          </div>
        </div>
      )}

      {screen === 'support' && (
        <ScrollArea className="flex-1">
          <div className="max-w-2xl mx-auto p-4 space-y-4">
            <div className="bg-card rounded-2xl p-6 space-y-4">
              <h3 className="font-semibold text-lg">Написать в поддержку</h3>
              <Textarea placeholder="Опишите вашу проблему..." rows={6} />
              <Button className="w-full">
                <Icon name="Send" size={16} className="mr-2" />
                Отправить
              </Button>
            </div>
          </div>
        </ScrollArea>
      )}

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="w-80">
          <SheetHeader>
            <SheetTitle>Меню</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-2">
            <Button
              variant={screen === 'chats' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => { setScreen('chats'); setMenuOpen(false); }}
            >
              <Icon name="MessageCircle" size={20} className="mr-3" />
              Чаты
            </Button>
            <Button
              variant={screen === 'profile' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => { setScreen('profile'); setMenuOpen(false); }}
            >
              <Icon name="User" size={20} className="mr-3" />
              Профиль
            </Button>
            <Button
              variant={screen === 'friends' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => { setScreen('friends'); setMenuOpen(false); }}
            >
              <Icon name="Users" size={20} className="mr-3" />
              Друзья
            </Button>
            <Button
              variant={screen === 'music' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => { setScreen('music'); setMenuOpen(false); }}
            >
              <Icon name="Music" size={20} className="mr-3" />
              Музыка
            </Button>
            <Button
              variant={screen === 'wallet' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => { setScreen('wallet'); setMenuOpen(false); }}
            >
              <Icon name="Wallet" size={20} className="mr-3" />
              Кошелёк
            </Button>
            <Button
              variant={screen === 'shop' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => { setScreen('shop'); setMenuOpen(false); }}
            >
              <Icon name="ShoppingBag" size={20} className="mr-3" />
              Магазин
            </Button>
            <Separator className="my-2" />
            <Button
              variant={screen === 'settings' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => { setScreen('settings'); setMenuOpen(false); }}
            >
              <Icon name="Settings" size={20} className="mr-3" />
              Настройки
            </Button>
            <Button
              variant={screen === 'blacklist' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => { setScreen('blacklist'); setMenuOpen(false); }}
            >
              <Icon name="UserX" size={20} className="mr-3" />
              Чёрный список
            </Button>
            <Button
              variant={screen === 'support' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => { setScreen('support'); setMenuOpen(false); }}
            >
              <Icon name="HelpCircle" size={20} className="mr-3" />
              Поддержка
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Index;
