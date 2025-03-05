from sqlalchemy.orm import sessionmaker, Session
from app.models.item import Item, Base
from sqlalchemy import create_engine
from app.core.config import settings

engine = create_engine(settings.DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)


def init_db():
    Base.metadata.create_all(bind=engine)
    
## ITEMS OPERATIONS

def get_items(db_session, skip: int = 0, limit: int = 10):
    return db_session.query(Item).offset(skip).limit(limit).all()

def create_item(db_session: Session, item_data):
    item = Item(**item_data.dict())
    db_session.add(item)
    db_session.commit()
    db_session.refresh(item)
    return item