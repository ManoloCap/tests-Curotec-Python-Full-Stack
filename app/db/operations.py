from sqlalchemy.orm import sessionmaker, Session
from app.models.item import Item, Base
from sqlalchemy import create_engine
from app.core.config import settings

engine = create_engine(settings.DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)


def init_db():
    Base.metadata.create_all(bind=engine)
    
## ITEMS OPERATIONS

def get_items_count(db_session: Session):
    return db_session.query(Item).count()

def get_items(db_session, skip: int = 0, limit: int = 10):
    return db_session.query(Item).offset(skip).limit(limit).all()

def create_item(db_session: Session, item_data):
    item = Item(**item_data.dict())
    db_session.add(item)
    db_session.commit()
    db_session.refresh(item)
    return item


def delete_item(db: Session, item_id: int) -> bool:
    # Query the item by ID
    item = db.query(Item).filter(Item.id == item_id).first()
    
    # If the item does not exist, return False
    if item is None:
        return False
    
    # Delete the item
    db.delete(item)
    # Commit the changes
    db.commit()
    return True