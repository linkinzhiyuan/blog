import pygame

class Ship:
    """管理飞船的类"""
    def __init__(self, ai_game):
        """初始化飞船并设置起始位置"""
        self.screen = ai_game.screen
        self.screen_rect = ai_game.screen.get_rect()

        # 加载飞船图像并获取其外接矩形
        self.image = pygame.image.load('images/alien.png')
        self.rect = self.image.get_rect()

        # 对于每艘新飞船，放在屏幕底部中央
        self.rect.midbottom = self.screen_rect.midbottom

    def blitme(self):
        """在指定位置绘制飞船"""
        self.screen.blit(self.image, self.rect)