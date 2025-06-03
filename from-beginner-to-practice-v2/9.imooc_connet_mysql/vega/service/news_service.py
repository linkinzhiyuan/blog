from ..db.news_dao import NewsDao

class NewsService:
    __news_dao = NewsDao()

    # 查询待审批新闻列表
    def search_unreview_list(self,page):
        return self.__news_dao.search_unreview_list(page)
